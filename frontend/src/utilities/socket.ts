import { io } from "socket.io-client";

const DOMAIN = import.meta.env.VITE_BACKEND_ORIGIN;
const SOCKET_PATH = import.meta.env.VITE_SOCKET_PATH;

let cookies = Object.fromEntries(
  document.cookie.split("; ").map((c) => {
    const [key, ...v] = c.split("=");
    return [key, v.join("=")];
  }),
);

export const globalSocket = io(DOMAIN, {
  path: SOCKET_PATH,
  withCredentials: true,
  auth: {
    token: cookies["jwt"],
  },
});
