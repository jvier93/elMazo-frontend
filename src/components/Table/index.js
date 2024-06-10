import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import { Carta } from "../Carta/index.js";
import { usePlaySound } from "../../hooks/usePlaySound";
import "./Table.css";

export function Table({ sound }) {
  const [table, setTable] = useState({ _cards: [] });
  const [showButton, setShowButton] = useState(false);
  const { play } = usePlaySound({ sound: "deslizar2" });

  function raiseTableCard() {
    socket.emit("raiseTableCard");
    if (sound) {
      play();
    }
  }

  useEffect(() => {
    function handleUpdateTable(table) {
      setTable(table);
    }
    function evalShowButton(players, gameStatus) {
      const playerInTurn = players.find((player) => {
        return player._inTurn;
      });

      if (!playerInTurn) {
        return;
      }

      if (
        playerInTurn._socketId === socket.id &&
        playerInTurn._hand.length === 7 &&
        gameStatus !== "pausa"
      ) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    }
    socket.on("updateTable", handleUpdateTable);
    socket.on("updatePlayers", evalShowButton);

    return function cleanup() {
      socket.off("updateTable", handleUpdateTable);
      socket.off("updatePlayers", evalShowButton);
    };
  }, []);

  function lastCard() {
    if (table._cards.length > 1) {
      return table._cards.length - 1;
    } else {
      return 0;
    }
  }

  return (
    <div className="table deck w-24 h-32  sm:w-28 sm:h-40">
      {table._cards.length !== 0 ? (
        <div>
          <Carta
            functionToExecute={raiseTableCard}
            cardIn="table"
            showButton={showButton}
            textToShow="Levantar"
            src={table._cards[lastCard()]._imgFront}
            src75={table._cards[lastCard()]._imgFront75}
          />

          <p className="text-xs text-center mt-2 sm:text-base">
            Cartas: {table._cards.length}
          </p>
        </div>
      ) : (
        <div>
          <div className="h-20 sm:h-28"></div>
          <p className="text-xs text-center mt-2 sm:text-base ">Cartas: 0</p>
        </div>
      )}
    </div>
  );
}
