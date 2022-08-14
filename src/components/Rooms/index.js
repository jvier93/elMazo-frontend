import React, { useState, useEffect } from "react";
import { CreateRoom } from "../CreateRoom";
import { socket } from "../Socket";

import { JoinRoom } from "../JoinRoom";

import "./Rooms.css";
import { usePrueba } from "../../hooks/usePrueba";
export const Rooms = ({ nombre, roomList }) => {
  useEffect(() => {
    socket.emit("createUser", nombre);
  }, [nombre]);

  const [show, setShow] = useState("nueva sala");

  function handleChange(e) {
    setShow(e.target.value);
  }

  return (
    <div className="w-max p-4 pt-14   ">
      <div className="">
        <div className="flex h-8 items-center justify-around ">
          <label
            className={
              show === "nueva sala"
                ? "w-3/6 h-6 text-center text-white rounded-l-lg  bg-gray-400  font-Mate"
                : "w-3/6 h-6 text-center  rounded-l-lg bg-gray-600  font-Mate"
            }
          >
            <input
              type="radio"
              checked={show === "nueva sala"}
              onChange={handleChange}
              value="nueva sala"
              hidden
            />
            Nueva sala
          </label>

          <label
            className={
              show === "unirse"
                ? "w-3/6 h-6 text-center rounded-r-lg  text-white bg-gray-400  font-Mate"
                : "w-3/6 h-6 text-center rounded-r-lg   bg-gray-600  font-Mate"
            }
          >
            <input
              hidden
              type="radio"
              className=""
              checked={show === "unirse"}
              onChange={handleChange}
              value="unirse"
            />
            Unirse
          </label>
        </div>

        <div className="">
          {show === "nueva sala" ? (
            <CreateRoom></CreateRoom>
          ) : (
            <JoinRoom roomList={roomList}></JoinRoom>
          )}
        </div>
      </div>
    </div>
  );
};
