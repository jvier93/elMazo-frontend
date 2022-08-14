import React, { useState } from "react";
import { PlayerHand } from "../PlayerHand";
import { PlayerPanel } from "../PlayerPanel";

export const Player = ({
  gameStatus,
  myPlayer,
  player,
  myHand = false,
  sound,
  showModal,
  setShowModal,
  setModalMode,
  modalMessage,
  setModalMessage,
}) => {
  //representa si esta activado el modo corte (se cambia desde el panel de jugador)
  const [cutMode, setCutMode] = useState(false);

  //si el player activo su modo de corte y se le fue el turno nos aseguramos de que el modo corte quede desactivado.
  if (!player._inTurn && cutMode === true) {
    setCutMode(false);
  }

  return (
    <div className="   md:flex  md:justify-center">
      <PlayerHand
        gameStatus={gameStatus}
        sound={sound}
        cutMode={cutMode}
        inTurn={player._inTurn}
        myGames={player._games}
        myHand={myHand}
        hands={player._hand}
        setCutMode={setCutMode}
      ></PlayerHand>

      <PlayerPanel
        myPlayer={myPlayer}
        admin={player._admin}
        inTurn={player._inTurn}
        name={player._name}
        score={player._score}
        //Referente al "corte" del juego
        qtyPlayerCards={player._hand.length}
        numOfPlayerGames={player._games.length}
        cutMode={cutMode}
        setCutMode={setCutMode}
        showModal={showModal}
        setModalMode={setModalMode}
        setShowModal={setShowModal}
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
      ></PlayerPanel>
    </div>
  );
};
