import { usuarioModel } from "../models/usuarios_models.js";

const usuarios = []; // io-socket

export class usuarioControl {
  static async getAll(req, res) {
    try {
      const datos = await usuarioModel.getAll();
      return res.json(datos);
    } catch (error) {
      console.error("Error al extraer los usuarios:", error.message);
      return res.status(500).json({ error: "Error al extraer usuario" });
    }
  }
  static async crearU(req, res) {
    try {
      const datos = await usuarioModel.crearU(req.body);
      return res
        .status(201)
        .json({ message: "Usuario creado con éxito", id: result.insertId });
    } catch (error) {
      console.error("Error al crear el usuarios:", error.message);
      return res.status(500).json({ error: "Error al crear elusuario" });
    }
  }

  // io-socket
  // unir usuarios conectados

  static unirUsuarios(id, username, room, room_p) {
    // Buscar el índice del usuario con el mismo username
    const index = usuarios.findIndex((user) => user.username === username);

    const user = { id, username, room, room_p };

    // Si existe el usuario, actualizamos los datos
    if (index !== -1) {
      //usuarios[index] = { id, username, room };
      usuarios[index].id = id;
      usuarios[index].room_p = room_p;
    } else {
      // Si no existe, lo agregamos
      usuarios.push(user);
    }

    return user;
  }
  // Unir Receptor al room privador
  static unirReceptor(receptor, room_p) {
    const index = usuarios.findIndex((user) => user.username === receptor);
    if (index !== -1) {
      usuarios[index].room_p = room_p;
    }
    console.log("impreme suaurios: ", usuarios);
    return usuarios[index];
  }

  static getReceptor(username, room_p) {
    const usuario = usuarios.find(
      (user) => user.room_p === room_p && user.username !== username
    );

    console.log("conseguir usuario: ", usuario);
    return usuario;
  }

  // Obtener el usuario actual
  static getCurrentUser(id) {
    return usuarios.find((user) => user.id === id);
  }

  static getCurrentUserByUsername(person) {
    return usuarios.find((user) => user.username === person);
  }

  // El usuario abandona el chat
  static userLeave(id) {
    const index = usuarios.findIndex((user) => user.id === id);
    if (index !== -1) {
      return usuarios.splice(index, 1)[0];
    }
  }

  // Obtener los usuarios de la sala
  static getRoomUsers(room) {
    return usuarios.filter((user) => user.room == room);
  }
}
