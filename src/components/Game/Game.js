import "./Game.css";
import { useState, useEffect } from "react";
import { Table } from "./../Table";
import { Deck } from "../Deck";
import { OtherPlayers } from "./../OtherPlayers";
import { MyPlayer } from "../MyPlayer";
import React from "react";
import { CutTable } from "../CutTable";
import { socket } from "./../Socket";
import { ModalNotification } from "../ModalNotification/ModalNotification";

export const Game = ({ sound }) => {
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState({ title: "", body: "" });
  //modal mode: el modo en el que se desplegara el modal mas detalles en el componente
  const [modalMode, setModalMode] = useState("");
  const [gameStatus, setGameStatus] = useState("pausa");
  useEffect(() => {
    function handleUpdateGameStatus(gameStatus) {
      console.log("se ejecuto game status", gameStatus);
      setGameStatus(gameStatus);
    }

    socket.on("updateGameStatus", handleUpdateGameStatus);
    return () => {
      socket.off("updateGameStatus", handleUpdateGameStatus);
    };
  }, []);

  return (
    <div className="pt-10">
      <div>
        <OtherPlayers></OtherPlayers>
        <div className="flex justify-center gap-4  my-4 md:my-10 ">
          <Deck sound={sound}></Deck>
          <CutTable></CutTable>
          <Table sound={sound}></Table>
        </div>
        <MyPlayer
          gameStatus={gameStatus}
          showModal={showModal}
          setModalMode={setModalMode}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          setModalMessage={setModalMessage}
          sound={sound}
        ></MyPlayer>
        <ModalNotification
          showModal={showModal}
          modalMode={modalMode}
          setModalMode={setModalMode}
          setShowModal={setShowModal}
          modalMessage={modalMessage}
          setModalMessage={setModalMessage}
        ></ModalNotification>
      </div>
    </div>
  );
};
