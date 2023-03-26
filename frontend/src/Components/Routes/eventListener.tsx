import { globalSocket } from "../../socket";

export function popOutFunc(payload: {
    sender: { id: string; nickname: string; pictureURL: string };
    senderSocketId: string;
  }) {
    console.log(
      payload.sender.nickname,
      "invited you to play a game. Do you accept?",
      payload.senderSocketId
    );

    // if route in lowercase is "/game"
    console.log("ROUTE IS", window.location.pathname);
    if (window.location.pathname.toLowerCase() === "/game")
      return console.log("User is busy, but got invite!");
// {
    // Create pop-up container
    const popupContainer = document.createElement("div");
    popupContainer.classList.add("popup-container");
    document.body.appendChild(popupContainer);

    // Create pop-up dialog
    const popupDialog = document.createElement("div");
    popupDialog.classList.add("popup-dialog");
    popupDialog.innerHTML = `
      <p>${payload.sender.nickname} invited you to play a game. Do you accept?</p>
      <button class="accept-button">Accept</button>
      <button class="decline-button">Decline</button>`;
    popupContainer.appendChild(popupDialog);

    // Add click event listener for accept button
    const acceptButton = popupDialog.querySelector(
      ".accept-button"
    ) as HTMLButtonElement;
    acceptButton.addEventListener("click", () => {
      console.log("Accept button clicked");
      globalSocket.emit("inviteAccepted", {
        senderSocketId: payload.senderSocketId,
      });
      popupContainer.removeChild(popupDialog);
      document.body.removeChild(popupContainer);
      // Redirect to the AcceptInvite event
      // ...
      // Emit redirect
      // ...
    });

    // Add click event listener for decline button
    const declineButton = popupDialog.querySelector(
      ".decline-button"
    ) as HTMLButtonElement;
    declineButton.addEventListener("click", () => {
      console.log("Decline button clicked");
      // Remove pop-up dialog
      popupContainer.removeChild(popupDialog);
      document.body.removeChild(popupContainer);
      // Remove pop-up container
    });
// }
  }