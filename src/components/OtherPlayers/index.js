import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import { Player } from "../Player";
import "./OtherPlayers.css";

export function OtherPlayers() {
  const [otherPlayers, setOtherPlayers] = useState(null);

  useEffect(() => {
    function handleUpdatePlayers(players) {
      function returnOtherPlayers() {
        let otherPlayers = [];
        players.map((player) => {
          if (player._socketId !== socket.id) {
            return otherPlayers.push(player);
          }
        });

        if (otherPlayers.length > 0) {
          return otherPlayers;
        } else {
          return null;
        }
      }

      setOtherPlayers(returnOtherPlayers());
    }
    socket.on("updatePlayers", handleUpdatePlayers);

    return function cleanup() {
      socket.off("updatePlayers", handleUpdatePlayers);
    };
  }, []);

  return (
    <div className="pt-4 flex flex-col items-center gap-2 md:gap-4  ">
      {otherPlayers?.map((player, index) => {
        return <Player key={index} myHand={false} player={player}></Player>;
      })}
    </div>
  );
}
