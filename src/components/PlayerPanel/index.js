import React from "react";
import { Controls } from "../Controls";
import { Information } from "../Information";

export const PlayerPanel = ({
  setCutMode,
  numOfPlayerGames,
  myPlayer = false,
  inTurn,
  qtyPlayerCards,
  name,
  admin,
  score,
  showModal,
  setShowModal,
  setModalMode,
  modalMessage,
  setModalMessage,
}) => {
  return (
    <div
      className={
        myPlayer
          ? "mx-auto md:mx-1  w-80 sm:w-96 px-4  py-2 flex justify-between font-Mate border-2 text-gray-800 bg-gray-200 rounded-b-lg text-white md:rounded-none md:rounded-r-lg md:w-60 "
          : "mx-auto md:mx-1  w-80 sm:w-96 px-4  py-2 flex justify-between font-Mate border-2 text-gray-800 bg-gray-200 rounded-b-lg text-white md:rounded-none md:rounded-r-lg md:w-28 "
      }
    >
      <Information inTurn={inTurn} name={name} score={score}></Information>
      <Controls
        inTurn={inTurn}
        qtyPlayerCards={qtyPlayerCards}
        myPlayer={myPlayer}
        admin={admin}
        numOfPlayerGames={numOfPlayerGames}
        setCutMode={setCutMode}
        showModal={showModal}
        setShowModal={setShowModal}
        setModalMode={setModalMode}
        modalMessage={modalMessage}
        setModalMessage={setModalMessage}
      ></Controls>
    </div>
  );
};
