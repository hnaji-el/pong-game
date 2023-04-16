import { io } from "socket.io-client";

const domain: any = process.env.REACT_APP_DOMAIN;

let cookies = Object.fromEntries(
  document.cookie.split("; ").map((c) => {
    const [key, ...v] = c.split("=");
    return [key, v.join("=")];
  })
);

export const globalSocket = io(domain, {
  withCredentials: true,
  auth: {
    token: cookies["jwt"],
  },
});

