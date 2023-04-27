import "./ChatLog.css";
import { socket } from "../Socket";
import React, { useState, useEffect } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute } from "@fortawesome/free-solid-svg-icons";

export const ChatLog = ({}) => {
  const [log, setLog] = useState("");

  useEffect(() => {
    if (log !== "") {
      setTimeout(() => {
        setLog("");
      }, 3000);
    }
  }, [log]);

  useEffect(() => {
    function handleMessage(message) {
      setLog(message);
    }

    socket.on("message", handleMessage);

    return () => {
      socket.off("message", handleMessage);
    };
  }, [log]);

  return (
    <div className="fixed z-50 w-full">
      <div className="h-10 font-Mate pl-2 pr-2 w-full bg-white flex justify-between items-center  gap-2 ">
        <div className="w-60 flex-grow transition-opacity">{log.text}</div>

        <div onClick={() => {}}>
          <FontAwesomeIcon icon={faVolumeMute} size="2x" />
        </div>
      </div>
    </div>
  );
};
