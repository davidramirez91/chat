export class mensajeModel {
  static async getMsm(collection) {
    try {
      const result = await collection.find().toArray(); // Convertir a un array los resultados de la consulta;
      return result;
    } catch (error) {
      throw new Error("Error al obtener los mensajes de la base de datos.");
    }
  }

  static async guardarMsm(collection, msm) {
    try {
      // Inserta un mensaje de prueba en la colección
      const mensaje = {
        autor: msm.usuario,
        mensaje: msm.mensaje,
        fecha: new Date(),
      };

      const result = await collection.insertOne(mensaje);
      return mensaje; // Retornar el mensaje insertado
    } catch (error) {
      throw new Error("Error al guardar el mensaje en la base de datos.");
    }
  }
}

// run().catch(console.dir);

/////////////////////////////////////////
/*
// Definir el esquema
const mensajeSchema = new mongoose.Schema({
  usuario: {
    type: String,
    required: true,
  },
  mensaje: {
    type: String,
    required: true,
  },
  fecha_envio: {
    type: Date, // Usaremos tipo Date para manejar fechas más fácilmente
    default: Date.now, // Almacenar la fecha y hora actual por defecto
  },
});

// Modelo de mensaje basado en el esquema
const MensajeModel = mongoose.model("mensajes", mensajeSchema);

export class MensajeModels {
  // Recuperar todos los mensajes
  static async getAll() {
    try {
      const mensajes = await MensajeModel.find().sort({ fecha_envio: 1 });
      return mensajes;
    } catch (error) {
      console.error("Error al obtener mensajes: ", error);
      throw error;
    }
  }

  // Crear un nuevo mensaje
  static async create({ usuario, mensaje }) {
    try {
      const nuevoMensaje = new MensajeModel({
        usuario,
        mensaje,
      });
      await nuevoMensaje.save(); // Guardar el mensaje en la base de datos
      return nuevoMensaje;
    } catch (error) {
      console.error("Error al guardar el mensaje: ", error);
      throw error;
    }
  }
}
*/
