import React, { useEffect, createContext, useState } from "react";
import Navigation from "../Navigation/Navigation";
import fire from "../../assets/fire.png";
import { getDataUserLogged } from "../../API";
import Spinner from "../Spinner";
import { Link, useNavigate } from "react-router-dom";
// import { io } from "socket.io-client";
// import { globalSocket } from "../../App";
// import { Socket } from "socket.io-client";

interface TypeData {
  id: string;
  pictureURL: string;
  nickname: string;
}

interface TypeContext {
  value: boolean;
  settings: TypeData;
  updateSettings: React.Dispatch<React.SetStateAction<TypeData>>;
}

export const ActiveHome = createContext<TypeContext>({
  value: false,
  settings: { id: "", pictureURL: "", nickname: "" },
  updateSettings: () => {},
});

export default function Home() {
  const [ArrayofPlayersAndroomId, setArrayofPlayersAndroomId] = useState<
    string[]
  >([]);
  const [settings, setSettings] = useState<TypeData>({
    id: "",
    pictureURL: "",
    nickname: "",
  });

    

  useEffect(() => {

    // receiver
    // ...

    // navigate to game even that sends you to game with privateQueue state
    // ...
    // if (!globalSocket.hasListeners("navigateToGame")){

    //   globalSocket.on("navigateToGame", () => {
    //     console.log("navigateToGame", globalSocket.id);
    //     navigate("/game", { state: { privateQueue: true } });
    //   });
    // }
    // if (!globalSocket.hasListeners("invitePlayer")){

    //   globalSocket.on(
    //     "invitePlayer",
    //     (payload: {
    //       sender: { id: string; nickname: string; pictureURL: string };
    //       senderSocketId: string;
    //     }) => {
    //       console.log(
    //         payload.sender.nickname,
    //         "invited you to play a game. Do you accept?",
    //         payload.senderSocketId
    //       );
      
    //       // Create pop-up container
    //       const popupContainer = document.createElement("div");
    //       popupContainer.classList.add("popup-container");
    //       document.body.appendChild(popupContainer);
      
    //       // Create pop-up dialog
    //       const popupDialog = document.createElement("div");
    //       popupDialog.classList.add("popup-dialog");
    //       popupDialog.innerHTML = `
    //         <p>${payload.sender.nickname} invited you to play a game. Do you accept?</p>
    //         <button class="accept-button">Accept</button>
    //         <button class="decline-button">Decline</button>`;
    //       popupContainer.appendChild(popupDialog);
      
    //       // Add click event listener for accept button
    //       const acceptButton = popupDialog.querySelector(
    //         ".accept-button"
    //       ) as HTMLButtonElement;
    //       acceptButton.addEventListener("click", () => {
    //         console.log("Accept button clicked");
    //         globalSocket.emit("inviteAccepted", {
    //           senderSocketId: payload.senderSocketId,
    //         });
    //         popupContainer.removeChild(popupDialog);
    //         document.body.removeChild(popupContainer);
    //         // Redirect to the AcceptInvite event
    //         // ...
    //         // Emit redirect
    //         // ...
    //       });
      
    //       // Add click event listener for decline button
    //       const declineButton = popupDialog.querySelector(
    //         ".decline-button"
    //       ) as HTMLButtonElement;
    //       declineButton.addEventListener("click", () => {
    //         console.log("Decline button clicked");
    //         // Remove pop-up dialog
    //         popupContainer.removeChild(popupDialog);
    //         document.body.removeChild(popupContainer);
    //         // Remove pop-up container
    //       });
    //     }
    //   );
    // }
    

    // Add CSS for pop-up dialog


    // Add style element to head


    document.title = "Pong - Home";
    fetch("http://localhost:3000/game/liveGames")
      .then((response) => response.json())
      .then((data) => setArrayofPlayersAndroomId(data))
      .catch((error) => console.log(error));
    getDataUserLogged((res: TypeData) => {
      setSettings(res);
    });
  }, []);

  if (settings.nickname.length)
    return (
      <ActiveHome.Provider
        value={{ value: true, settings: settings, updateSettings: setSettings }}
      >
        <Navigation />
        <main className="mx-3 pb-20 lg:pb-1 pt-10 lg:ml-64 lg:mr-4">
          <div className="flex flex-col gap-5 w-full h-full">
            <h1 className="text-primaryText text-2xl flex items-center gap-1.5">
              <span>Live Games</span>
              <img src={fire} alt="fire" className="w-4" />
            </h1>
            {ArrayofPlayersAndroomId.map(
                (element: any) => (
                  <div key={element.players}>
                    <Link to="/Game" state={{ roomId: element.roomId }}>
                      <button className="bg-primary hover:bg-primaryHover text-white font-bold py-2 px-4 rounded">
                        {element.players}
                      </button>
                    </Link>
                  </div>
                )
              )}
          </div>
        </main>
      </ActiveHome.Provider>
    );
  return (
    <div className="mx-3 flex justify-center items-center h-full">
      <Spinner />
    </div>
  );
}
