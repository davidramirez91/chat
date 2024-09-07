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
  static unirUsuarios(id, username, room) {
    const user = { id, username, room };
    usuarios.push(user);
    return usuarios;
  }
  // Obtener el usuario actual
  static getCurrentUser(id) {
    return usuarios.find((user) => user.id === id);
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
