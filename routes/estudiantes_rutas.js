import { Router } from "express";
import { estudiantesControl } from "../controllers/estudiantes_control.js";
import { apiKeyAuth } from "../middleware/auth.js";
export const rutas_estudiantes = Router();

rutas_estudiantes.get(
  "/estudiantes",
  apiKeyAuth,
  estudiantesControl.getEstudiantes
);
rutas_estudiantes.post(
  "/estudiantes",
  apiKeyAuth,
  estudiantesControl.crearEstudiantes
);
rutas_estudiantes.put(
  "/estudiantes/:id",
  apiKeyAuth,
  estudiantesControl.actualizarEstudiantes
);
