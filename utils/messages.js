import moment from "moment";

export function formatoMensaje(username, text) {
  return {
    username,
    text,
    time: moment().format("h:mm a"),
  };
}
