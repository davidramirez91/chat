import { Router } from "express";
// import { mensajeModel } from "./models/mensajesMongodb_models.js";

export const rutas = Router();

rutas.get("/", async (req, res) => {
  const username = req.query.username;
  const room = req.query.room;

  if (username) {
    res.render("index", { title: "EINSPHI", username, room, login: true });
  } else {
    res.render("index", { title: "EINSPHI", login: false });
  }
});
