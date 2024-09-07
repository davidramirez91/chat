import { mensajeModel } from "../models/mensajesMongodb_models.js";

export class mensajeControl {
  static async getMsm(collection) {
    try {
      const datos = await mensajeModel.getMsm(collection);
      return datos; // Enviar datos directamente al socket
    } catch (error) {
      console.error("Error al conseguir los mensajes:", error.message);
      throw new Error("Error al conseguir los mensajes");
    }
  }
  static async guardarMsm(collection, msm) {
    try {
      const nuevoMensaje = await mensajeModel.guardarMsm(collection, msm);
      return nuevoMensaje; // Devolver el nuevo mensaje guardado
    } catch (error) {
      console.error("Error al guardar el mensaje:", error.message);
      throw new Error("Error al guardar el mensaje");
    }
  }
}
