import React, { useState } from "react";
import { socket } from "../Socket";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const JoinRoom = ({ roomList }) => {
  const [password, setPassword] = useState("");

  function handleSubmitForm(e) {
    e.preventDefault();
  }

  function handleChangePassword(e) {
    setPassword(e.target.value);
  }

  function handleClickJoin(indexRoom) {
    const roomName = roomList[indexRoom]._gameName;

    socket.emit("joinGameRoom", roomName, password);
  }

  return (
    <div className="pt-6">
      <div>
        <form onSubmit={handleSubmitForm}>
          <label
            htmlFor="roomName"
            className="select-none text-white font-Mate"
          >
            Contraseña &nbsp;
          </label>

          <input
            className=" text-black rounded focus:outline-none pl-1 w-40 h-6  "
            onChange={handleChangePassword}
            type="text"
          ></input>
        </form>
      </div>
      <div className="  py-4 flex flex-col gap-2 ">
        <p className="text-white font-Mate">Salas de juego:</p>
        {roomList.length > 0 ? (
          roomList.map((room, index) => {
            return (
              <div className="bg-gray-600 h-10 flex justify-around items-center text-white ">
                <p>{room._gameName}</p>
                <div className="flex items-center">
                  <FontAwesomeIcon icon={faUser} inverse />
                  <p className="pl-1">{room._players.length}/3</p>
                </div>

                <button
                  onClick={() => {
                    handleClickJoin(index);
                  }}
                  className="bg-purple-400 px-3 rounded text-white shadow"
                  type="submit"
                >
                  Unirse
                </button>
              </div>
            );
          })
        ) : (
          <div className="flex justify-center pt-4">
            <p className="text-white font-size-4 font-Mate italic">
              Aun no hay salas creadas...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
