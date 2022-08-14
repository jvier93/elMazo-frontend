import "./ChatLog.css";
import { Timer } from "../Timer";
import { socket } from "../Socket";
import React, { useState, useEffect } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";

//import { usePlaySound } from "./hooks/usePlaySound";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeMute, faVolumeUp } from "@fortawesome/free-solid-svg-icons";

export const ChatLog = ({}) => {
  const [log, setLog] = useState("");

  const [restart, setRestart] = useState(0);
  // const { play } = usePlaySound({ sound: "message" });

  // const [sound, setSound] = useState(false);
  // const { play, stop } = usePlaySound({ sound: "music", setSound: setSound });

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
      // if (sound) {
      //   play();
      // }
    }

    // function handleDisconnect() {
    //   setLog({ text: "se ha desconectado del servidor" });
    //   if (sound) {
    //     play();
    //   }
    // }

    socket.on("message", handleMessage);

    // socket.on("disconnect", handleDisconnect);

    return () => {
      socket.off("message", handleMessage);

      // socket.off("disconnect", handleDisconnect);
    };
  }, [log]);

  return (
    <div className="fixed z-50 w-full">
      <div className="h-10 font-Mate pl-2 pr-2 w-full bg-white flex justify-between items-center  gap-2 ">
        <div className="w-60 flex-grow transition-opacity">{log.text}</div>

        <a
          onClick={() => {
            //setSound(!sound);
          }}
        >
          {/* {sound ? (
          <FontAwesomeIcon icon={faVolumeUp} size="2x" inverse />
        ) : ( */}
          <FontAwesomeIcon icon={faVolumeMute} size="2x" />

          {/* )} */}
        </a>
      </div>
    </div>
  );
};
