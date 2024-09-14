import { usuarioControl } from "../controllers/usuarios_control.js";
import { io } from "../index.js";
import { formatoMensaje } from "../utils/messages.js";
import { usuarioModel } from "./usuarios_models.js";

const botName = "Einsphi";

export class ioModel {
  static async getIO(socket) {
    // Unir chat grupal
    socket.on("unirRoom", ({ username, room }) => {
      let usuario = usuarioControl.unirUsuarios(socket.id, username, room, "");
      socket.join(usuario.room);

      // Eviar el usuario actual // Binvenida del bot
      socket.emit("message", formatoMensaje(botName, "Bienvenido al chat"));

      /*
      // Emisión cuando un usuario se conecta // // Broadcast when a user connects
      // todos menos yo
      socket.broadcast
        .to(usuario.room)
        .emit(
          "message",
          formatoMensaje(botName, `${usuario.username} se ha unido al chat`)
        );
      */

      // envia informacion user y room
      io.to(usuario.room).emit("roomUsers", {
        room: usuario.room,
        users: usuarioControl.getRoomUsers(usuario.room),
      });
    });

    // escucha el mensaje
    socket.on("chatMessage", (msg) => {
      const user = usuarioControl.getCurrentUser(socket.id);
      io.to(user.room).emit("message", formatoMensaje(user.username, msg));
    });

    /*
    socket.on(
      "UnirchatPrivadoReceptor",
      ({ username, person, room, room_p }) => {
        let usuario = usuarioControl.unirUsuarios(
          socket.id,
          username,
          room,
          room_p
        );
        console.log(
          `${username} ha solicitado un chat privado con ${person} en la sala ${room_p}`
        );
        socket.join(usuario.room_p);
      }
    );
    */

    /////// CHAT PRIVADO
    socket.on("UnirchatPrivado", ({ username, person, room, room_p }) => {
      var emisor = usuarioControl.getCurrentUserByUsername(username);
      var receptor = usuarioControl.getCurrentUserByUsername(person);

      let cuarto1 = emisor.room_p; // david-iebt
      let cuarto2 = receptor.room_p; // ibeth-david

      // Verificar si ambas cadenas contienen el guión
      if (!cuarto1.includes("-") || !cuarto2.includes("-")) {
        var emisor = usuarioControl.unirUsuarios(
          socket.id,
          username,
          room,
          room_p
        );
        var receptor = usuarioControl.unirReceptor(person, room_p);
      } else {
        // Dividimos cada string por el guión y luego ordenamos los nombres
        const [nombre1A, nombre1B] = cuarto1.split("-").sort();
        const [nombre2A, nombre2B] = cuarto2.split("-").sort();

        // Comparamos los nombres ya ordenados
        if (nombre1A !== nombre2A && nombre1B !== nombre2B) {
          var emisor = usuarioControl.unirUsuarios(
            socket.id,
            username,
            room,
            room_p
          );
          var receptor = usuarioControl.unirReceptor(person, room_p);
        }
      }

      console.log(
        `${emisor.username} ha solicitado un chat privado con ${receptor.username} en la sala ${receptor.room_p}`
      );

      socket.join(receptor.room_p);
    });

    socket.on("chatMessagePrivado", (msg) => {
      const user = usuarioControl.getCurrentUser(socket.id);
      const receptor = usuarioControl.getReceptor(user.username, user.room_p);
      io.to(receptor.id).emit("notificacionPrivada", {
        emisor: user.username,
        receptor: receptor.username,
        mensaje: msg,
      });
      io.to(user.room_p).emit(
        "message_privad",
        formatoMensaje(user.username, msg)
      );
    });

    // Runs when client disconnects
    socket.on("disconnect", () => {
      const user = usuarioControl.userLeave(socket.id);

      if (user) {
        io.to(user.room).emit(
          "message",
          formatoMensaje(botName, `${user.username} ha dejado el chat`)
        );

        // Envia informacion de usuarios y room
        io.to(user.room).emit("roomUsers", {
          room: user.room,
          users: usuarioControl.getRoomUsers(user.room),
        });
      }
    });
  }
}
