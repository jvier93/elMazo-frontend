import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import { Player } from "./../Player";
import "./MyPlayer.css";

export const MyPlayer = ({
  sound,
  showModal,
  setModalMode,
  setShowModal,
  modalMessage,
  setModalMessage,
  gameStatus,
}) => {
  const [myPlayer, setMyPlayer] = useState(null);

  useEffect(() => {
    function handleUpdateMyHand(players) {
      setMyPlayer(returnMyPlayer(players));
    }
    socket.on("updateMyHand", handleUpdateMyHand);

    function handleUpdatePlayers(players) {
      setMyPlayer(returnMyPlayer(players));
    }
    socket.on("updatePlayers", handleUpdatePlayers);

    return function cleanup() {
      socket.off("updateMyHand", handleUpdateMyHand);
      socket.off("updatePlayers", handleUpdatePlayers);
    };
  }, []);

  //Funcion que de el array de players recibido retorna el mio
  function returnMyPlayer(players) {
    const myPlayer = players.find((player) => {
      return player._socketId === socket.id;
    });

    return myPlayer;
  }

  return (
    <div className="">
      {myPlayer !== null ? (
        <Player
          gameStatus={gameStatus}
          myPlayer={true}
          myHand={true}
          player={myPlayer}
          sound={sound}
          showModal={showModal}
          setModalMode={setModalMode}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          setModalMessage={setModalMessage}
        ></Player>
      ) : (
        <div></div>
      )}
    </div>
  );
};
