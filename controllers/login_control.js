import { usuarioModel } from "../models/usuarios_models.js";

export class loginControl {
  static async logiar(req, res) {
    const { username_input, password_input, room } = req.body; // form de req.body
    try {
      const usuario = await usuarioModel.getByName(username_input);
      if (usuario.Contrasena === password_input) {
        res.redirect(
          `/?username=${encodeURIComponent(
            username_input
          )}&room=${encodeURIComponent(room)}`
        );
      } else {
        console.log("mal contraseña o no existe usuario");
        res.redirect("/");
      }
    } catch (error) {
      console.log("Error en el login:", error);
      res.redirect("/");
    }
  }
}
