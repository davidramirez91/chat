import { estudiantesModel } from "../models/estudiantes_models.js";

export class estudiantesControl {
  static async getEstudiantes(req, res) {
    try {
      const datos = await estudiantesModel.getEstudiantes();
      return res.json(datos);
    } catch (error) {
      console.error("Error al extraer los estudiantes:", error.message);
      return res.status(500).json({ error: "Error al extraer estudiantes" });
    }
  }
  static async crearEstudiantes(req, res) {
    try {
      const datos = await estudiantesModel.crearEstudiantes(req.body);
      return res
        .status(201)
        .json({ message: "Estudiante creado con éxito", id: result.insertId });
    } catch (error) {
      console.error("Error al crear al Estudiantes:", error.message);
      return res.status(500).json({ error: "Error al crear al Estudiante" });
    }
  }
  static async actualizarEstudiantes(req, res) {
    try {
      const id = req.params.id;
      const datos = await estudiantesModel.actualizarEstudiantes(id);
      return res.status(201).json(datos);
    } catch (error) {
      console.error("Error al actualizar al Estudiantes:", error.message);
      return res
        .status(500)
        .json({ error: "Error al actualizar al Estudiante" });
    }
  }
}
