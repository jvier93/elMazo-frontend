import React, { useState } from "react";
import { socket } from "./../Socket";
export const CreateRoom = () => {
  const [roomPassword, setRoomPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [roomName, setRoomName] = useState("");
  const [points, setPoints] = useState(100);
  const [timePerPlayer, setTimePerPlayer] = useState(30);
  function handleClickRoomPassword(e) {
    setRoomPassword(!roomPassword);
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleChangePoints(e) {
    setPoints(e.target.value);
  }
  function handleChangeTimePerPlayer(e) {
    setTimePerPlayer(e.target.value);
  }

  function handleChangeRoomName(e) {
    setRoomName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    socket.emit("createRoom", roomName, password, points, timePerPlayer);
  }

  return (
    <div className=" ">
      <form onSubmit={handleSubmit} className="text-white font-Mate  mt-6">
        <div>
          <label htmlFor="roomName" className="select-none">
            Sala &nbsp;
          </label>
          <input
            autoComplete="off"
            className=" text-black rounded focus:outline-none pl-1 w-40 h-6 "
            maxLength="10"
            onChange={handleChangeRoomName}
            value={roomName}
            type="text"
            required
            name="roomName"
          ></input>
        </div>
        <div className=" mt-1">
          <label htmlFor="roomPassword" className="select-none">
            Contraseña &nbsp;
          </label>
          <input
            onChange={handleClickRoomPassword}
            checked={roomPassword}
            type="checkbox"
            id="roomPassword"
            name="roomPassword"
          ></input>
          <input
            autoComplete="off"
            maxLength="10"
            className=" text-black rounded focus:outline-none ml-1 pl-1 w-32 h-6"
            onChange={handleChangePassword}
            value={password}
            disabled={!roomPassword}
            type="password"
          ></input>
        </div>
        <div className=" mt-1">
          <label htmlFor="roomPassword" className="select-none">
            Puntos &nbsp;
          </label>

          <input
            autoComplete="off"
            min="30"
            max="1000"
            className=" text-black rounded focus:outline-none ml-1 pl-1 w-24 h-6"
            onChange={handleChangePoints}
            value={points}
            type="number"
          ></input>
        </div>
        <div className="mb-4 mt-1">
          <label htmlFor="roomPassword" className="select-none">
            Tiempo por turno &nbsp;
          </label>

          <input
            autoComplete="off"
            maxLength="2"
            className=" text-black rounded focus:outline-none ml-1 pl-1 w-20 h-6"
            onChange={handleChangeTimePerPlayer}
            value={timePerPlayer}
            type="number"
          ></input>
        </div>

        <button className="w-40 h-6 rounded bg-gray-400 text-black hover:text-white">
          Crear
        </button>
      </form>
    </div>
  );
};
