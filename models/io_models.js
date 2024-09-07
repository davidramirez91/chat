import { usuarioControl } from "../controllers/usuarios_control.js";
import { io } from "../index.js";
import { usuarioModel } from "./usuarios_models.js";

export class ioModel {
  static async getIO(socket) {
    socket.on("unirRoom", ({ username, room }) => {
      let usuarios = usuarioControl.unirUsuarios(socket.id, username, room);
      console.log(usuarios);
    });
  }
}
