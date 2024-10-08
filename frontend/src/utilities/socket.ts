import { io } from "socket.io-client";

const domain: any = import.meta.env.VITE_BACKEND_URL;

let cookies = Object.fromEntries(
  document.cookie.split("; ").map((c) => {
    const [key, ...v] = c.split("=");
    return [key, v.join("=")];
  }),
);

export const globalSocket = io(domain, {
  withCredentials: true,
  auth: {
    token: cookies["jwt"],
  },
});
