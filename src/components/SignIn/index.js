import React from "react";
import { Banner } from "../Banner";
import "./SignIn.css";

export const SignIn = ({
  setRegistrado,
  nombre,
  setNombre,
  gameName,
  setGameName,
}) => {
  function handleSubmit(e) {
    e.preventDefault();
    if (nombre !== "") {
      setRegistrado(true);
    }
  }

  function handleChangeName(e) {
    e.preventDefault();
    setNombre(e.target.value);
  }

  function handleChangeGame(e) {
    e.preventDefault();
    setGameName(e.target.value);
  }

  return (
    <div className="w-max p-4 pt-14   md:flex">
      <Banner></Banner>

      <form className="ml-10 mt-10   " onSubmit={handleSubmit}>
        <div htmlFor="name" className="">
          <label className="text-white font-Mate select-none">
            Tu nombre &nbsp;{" "}
          </label>
          <input
            autoComplete="off"
            className="rounded font-Mate focus:outline-none pl-1 w-40 h-6  "
            onChange={handleChangeName}
            name="name"
            type="text"
            placeholder=""
            value={nombre}
            required
          ></input>
        </div>
        <div className="mb-4 mt-1">
          <label className="text-white font-Mate  select-none" htmlFor="game">
            Juego &nbsp;
          </label>
          <select
            className="rounded px-4 h-6  font-Mate"
            name="game"
            value={gameName}
            onChange={handleChangeGame}
          >
            <option value="LaConga">La Conga</option>
            <option value="ElTruco">El Truco</option>
          </select>
        </div>
        <button
          type="submit"
          className="  w-40 h-6 rounded bg-gray-400 text-black hover:text-white font-Mate  "
        >
          Conectar
        </button>
      </form>
    </div>
  );
};
