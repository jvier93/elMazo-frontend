import React, { useState, useEffect } from "react";
import "./App.css";
import { SignIn } from "./components/SignIn";
import { Rooms } from "./components/Rooms";

import { socket } from "./components/Socket";
import { Game } from "./components/Game/Game";
import { ChatLog } from "./components/ChatLog/index";

function App() {
  const [registrado, setRegistrado] = useState(false);
  const [nombre, setNombre] = useState("");
  const [gameName, setGameName] = useState("LaConga");
  const [playerRoom, setPlayerRoom] = useState("#000");
  const [roomList, setRoomList] = useState([]);

  useEffect(() => {
    socket.connect();

    socket.on("updateRoomList", (rooms) => {
      setRoomList(rooms);
    });
    socket.on("updateUserRoom", (room) => {
      setPlayerRoom(room);
    });

    socket.on("disconnect", () => {
      setRegistrado(false);
      setPlayerRoom("#000");
    });
  }, []);

  return (
    <div className="w-100 flex flex-col items-center pb-2  min-h-screen bg-gray-800   ">
      <ChatLog></ChatLog>

      <div>
        {(() => {
          if (!registrado) {
            return (
              <SignIn //Aqui el jugador se "registra" y elige el game que quiere jugar
                setRegistrado={setRegistrado}
                nombre={nombre}
                setNombre={setNombre}
                gameName={gameName}
                setGameName={setGameName}
              ></SignIn>
            );
          }

          if (registrado && playerRoom === "#000") {
            return <Rooms roomList={roomList} nombre={nombre}></Rooms>; //De aqui se gestiona la creacion y union de usuarios recien "registrados" a las rooms del game elegido previamente
          }

          if (registrado && playerRoom !== "#000") {
            return <Game sound={true}></Game>; //Si el usuario esta registrado y ya pertenece a una room se muestra el game;
          }
        })()}
      </div>
    </div>
  );
}

export default App;
