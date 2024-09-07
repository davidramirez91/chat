import mysql from "mysql2/promise";

// Configuración de la conexión a la base de datos MySQL
const dbConfig = {
  host: "localhost", // Usualmente 'localhost' o la dirección IP del servidor MySQL 127.0.0.1:3306
  user: "u936632816_David",
  password: "David_Ramirez91",
  database: "u936632816_Pruebas",
};

export class estudiantesModel {
  static async getEstudiantes() {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      const [datos] = await conexion.query("SELECT * FROM `estudiantes`");
      conexion.end();
      return datos;
    } catch (error) {
      throw error;
    }
  }
  static async crearEstudiantes(esNew) {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      const query = `INSERT INTO estudiantes (DNI, Nombre, Representante, Contacto, Plan, Abono, Horas, Fecha_inicio, Fecha_registro, Correo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
      const [result] = await conexion.execute(query, [
        esNew.DNI,
        esNew.Nombre,
        esNew.Representante,
        esNew.Contacto,
        esNew.Plan,
        esNew.Abono,
        esNew.Horas,
        esNew.Fecha_inicio,
        esNew.Fecha_registro,
        esNew.Correo,
      ]);
      conexion.end();
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async actualizarEstudiantes(id) {
    try {
      const conexion = await mysql.createConnection(dbConfig);
      // Primero obtenemos las horas actuales del estudiante
      const [estudiante] = await conexion.query(
        "SELECT Horas FROM estudiantes WHERE id = ?",
        [id]
      );

      if (estudiante.length === 0) {
        conexion.end();
        throw new Error(`Estudiante con id ${id} no encontrado.`);
      }

      const horasActuales = estudiante[0].Horas;
      const horasActualizadas = horasActuales + 1;

      // Luego actualizamos las horas del estudiante
      const query = "UPDATE estudiantes SET Horas = ? WHERE id = ?";
      await conexion.execute(query, [horasActualizadas, id]);

      // Finalmente, devolvemos toda la información del estudiante actualizado
      const [estudianteActualizado] = await conexion.query(
        "SELECT * FROM estudiantes WHERE id = ?",
        [id]
      );
      conexion.end();
      return estudianteActualizado[0];
    } catch (error) {
      throw error;
    }
  }
}
