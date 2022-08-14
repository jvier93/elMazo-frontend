import React from "react";
import { Timer } from "../Timer";

export const Information = ({ name, score, inTurn }) => {
  return (
    <div className="w-24 flex flex-col">
      <h1 className="   text-xl  text-center">{name}</h1>
      <h2 className="   md:mt-4 text-sm text-center">Puntos: {score}</h2>
      <h2> {inTurn ? <Timer></Timer> : ""}</h2>
    </div>
  );
};
