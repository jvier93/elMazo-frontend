import { socket } from "../Socket";
import React, { useState, useEffect } from "react";

export const Timer = ({}) => {
  const [timer, setTimer] = useState({ timeInSeconds: "", message: "" });

  useEffect(() => {
    function handleUpdateTimer(timer) {
      setTimer(timer);
    }
    socket.on("updateTimer", handleUpdateTimer);
    return () => {
      socket.off("updateTimer", handleUpdateTimer);
    };
  }, [timer]);

  return (
    <div>
      <h2 className={`text-center text-sm`}> Tiempo: {timer.timeInSeconds}</h2>
    </div>
  );
};
