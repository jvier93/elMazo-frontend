import React from "react";
import { socket } from "../Socket";

export const Controls = ({
  inTurn,
  myPlayer,
  admin,
  numOfPlayerGames,
  cutMode,
  setCutMode,
  qtyPlayerCards,
  showModal,
  setShowModal,
  setModalMode,
  modalMessage,
  setModalMessage,
}) => {
  function startGame() {
    socket.emit("startGame");
  }

  function handleClickPlayerLeave() {
    setModalMessage({ title: "¿Desea abandonar el juego?", body: "" });
    setModalMode("playerLeave");
    setShowModal(true);
  }

  function handleClickCutMode() {
    numOfPlayerGames === 2 && qtyPlayerCards === 8
      ? setCutMode(true)
      : console.log(
          "debe tener 2 juegos y 8 cartas en mano para entrar en modo de corte"
        );
  }

  return (
    <div>
      {myPlayer ? (
        <div className="w-44 h-14 md:w-24">
          {admin ? (
            <div className=" md:flex  md:flex-col ">
              <button
                className="w-20 text-sm rounded hover:text-white font-Mate bg-gray-400 px-2 mx-1 md:my-1"
                onClick={startGame}
              >
                Iniciar
              </button>
              <button
                onClick={handleClickCutMode}
                className=" w-20 text-sm rounded  hover:text-white font-Mate bg-gray-400 px-2 mx-1 md:my-1"
              >
                Cortar
              </button>
              <button
                onClick={handleClickPlayerLeave}
                className=" w-20 text-sm rounded  hover:text-white font-Mate bg-gray-400 px-2  mx-1 md:my-1"
              >
                Abandonar
              </button>
            </div>
          ) : (
            <div className="md:flex md:flex-col">
              <button
                onClick={handleClickCutMode}
                className="  w-20 text-sm rounded   hover:text-white font-Mate bg-gray-400 px-2  mx-1 md:my-1"
              >
                Cortar
              </button>
              <button
                onClick={handleClickPlayerLeave}
                className=" w-20 text-sm rounded  hover:text-white font-Mate bg-gray-400 px-2  mx-1 md:my-1"
              >
                Abandonar
              </button>
            </div>
          )}
        </div>
      ) : (
        <></>
      )}
    </div>
  );
};
