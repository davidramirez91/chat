import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: "localhost", // Usualmente 'localhost' o la dirección IP del servidor MySQL 127.0.0.1:3306
  user: "u936632816_David",
  password: "David_Ramirez91",
  database: "u936632816_Pruebas",
};

export class usuarioModel {
  static async getAll() {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      const [datos] = await conexion.query("SELECT * FROM `usuarios`");
      conexion.end();
      return datos;
    } catch (error) {
      throw error;
    }
  }

  static async getByName(username) {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      const [datos] = await conexion.query(
        `SELECT * FROM usuarios WHERE Usuario = ?`,
        [username]
      );
      conexion.end();

      if (datos.length > 0) {
        return datos[0];
      } else {
        return { respuesta: "No existe el usuario" };
      }
    } catch (error) {
      throw error;
    }
  }

  static async crearU(usNew) {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      const query = `INSERT INTO usuarios (Usuario, Contrasena, Correo, Nivel_acceso) VALUES (?, ?, ?, ?)`;
      const [result] = await conexion.execute(query, [
        usNew.Usuario,
        usNew.Contrasena,
        usNew.Correo,
        usNew.Nivel_acceso,
      ]);
      conexion.end();
      return result;
    } catch (error) {
      throw error;
    }
  }
}
