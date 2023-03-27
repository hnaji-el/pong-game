import { io } from "socket.io-client";

let cookies = Object.fromEntries(
  document.cookie.split("; ").map((c) => {
    const [key, ...v] = c.split("=");
    return [key, v.join("=")];
  })
);

export const globalSocket = io("http://localhost:3000", {
  withCredentials: true,
  auth: {
    token: cookies["jwt"],
  },
});

//   const globalSocket = io('http://localhost:3001', {
//     withCredentials: true,
//     auth: {
//       token: cookies["jwt"],
//     },
//   });
//   console.log(globalSocket);
  // Replace with your server URL
