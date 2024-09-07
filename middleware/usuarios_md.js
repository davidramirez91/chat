import { Router } from "express";
import { usuarioControl } from "../controllers/usuarios_control.js";
import { apiKeyAuth } from "./auth.js";
export const rutas_usuarios = Router();

rutas_usuarios.get("/usuarios", apiKeyAuth, usuarioControl.getAll);
rutas_usuarios.post("/usuarios", apiKeyAuth, usuarioControl.crearU);
