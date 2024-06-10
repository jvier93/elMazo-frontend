import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import { Carta } from "../Carta/index.js";
import { usePlaySound } from "../../hooks/usePlaySound";
import "./Deck.css";

export function Deck({ sound }) {
  const [deck, setDeck] = useState({ _cards: [] });
  const [showButton, setShowButton] = useState(false);
  const { play } = usePlaySound({ sound: "deslizar2" });

  function raiseCard() {
    socket.emit("raiseCard");
    if (sound) {
      play();
    }
  }

  useEffect(() => {
    function handleUpdateDeck(deck) {
      setDeck(deck);
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
    socket.on("updateDeck", handleUpdateDeck);
    socket.on("updatePlayers", evalShowButton);

    return function cleanup() {
      socket.off("updateDeck", handleUpdateDeck);
      socket.off("updatePlayers", evalShowButton);
    };
  }, []);

  function lastCard() {
    if (deck._cards.length > 1) {
      return deck._cards.length - 1;
    } else {
      return 0;
    }
  }

  return (
    <div className="deck w-24 h-32  sm:w-28 sm:h-40 ">
      {deck._cards.length !== 0 ? (
        <div>
          <Carta
            functionToExecute={raiseCard}
            showButton={showButton}
            textToShow="Levantar"
            cardIn="deck"
            src={deck._cards[lastCard()]._imgBack}
            src75={deck._cards[lastCard()]._imgBack75}
          ></Carta>

          <p className="text-xs text-center mt-2 sm:text-base">
            Cartas:{deck._cards.length}
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
