// import mongoose from "mongoose";
import { MongoClient, ServerApiVersion } from "mongodb";

// Configuración de la conexión a MongoDB Atlas
const uri =
  "mongodb+srv://mensajeriadb:David_Ramirez91@mensajeriadb.77hdf.mongodb.net/MensajeDB?retryWrites=true&w=majority&appName=MensajeriaDB";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

export async function conecionMongoDB() {
  try {
    await client.connect();
    const database = client.db("MensajeDB");
    const collection = database.collection("chatDB");
    console.log("Conectado a MongoDB.");
    return [client, collection];
  } catch (error) {
    console.error("Error conectando a MongoDB:", error);
    throw error;
  }
}
