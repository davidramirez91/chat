import express, { json } from "express";
import { Server } from "socket.io";
import { createServer } from "node:http";
import cors from "cors";
import dotenv from "dotenv";

import { rutas_usuarios } from "./middleware/usuarios_md.js";
import { rutas } from "./routes/io_rutas.js";
import { rutas_estudiantes } from "./routes/estudiantes_rutas.js";
import { ioModel } from "./models/io_models.js";
import { usuarioModel } from "./models/usuarios_models.js";
import { loginControl } from "./controllers/login_control.js";

const app = express();
const server = createServer(app); // crea servidor WEBSOCKET

export const io = new Server(server, {
  connectionStateRecovery: {}, // guarda informacio por desconeccion
});

const PORT = process.env.PORT ?? 3000;
dotenv.config();

app.use(cors()); // orígenes permitidos (CORS)
app.use(json()); // req.body
app.use(express.urlencoded({ extended: true })); // datos de formularios req.body
app.use(express.static("public"));
app.disable("x-powered-by");

// Configurar EJS como motor de plantillas
app.set("view engine", "ejs");
app.set("views");

// MIDDLEWARE
app.use("/api", rutas_usuarios);

// RUTAS
app.use("/", rutas);
app.post("/login", loginControl.logiar);
app.use("/api_est", rutas_estudiantes);

io.on("connection", async (socket) => {
  ioModel.getIO(socket);
});

// ESUCHAR ahora al SERVIDOR y no la aplicacion
server.listen(PORT, () => {
  console.log(`puerto: http://localhost:${PORT}`);
});
