import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import { Carta } from "../Carta/index.js";
import "./CutTable.css";

export function CutTable() {
  const [cutTable, setCutTable] = useState({ _cards: [] });

  useEffect(() => {
    function handleCutTable(cutTable) {
      setCutTable(cutTable);
    }
    socket.on("updateCutTable", handleCutTable);

    return function cleanup() {
      socket.off("updateCutTable", handleCutTable);
    };
  }, []);

  function lastCard() {
    if (cutTable._cards.length > 1) {
      return cutTable._cards.length - 1;
    } else {
      return 0;
    }
  }

  return (
    <div className="cutTable w-24 h-32  sm:w-28 sm:h-40">
      {cutTable._cards.length !== 0 ? (
        <div>
          <Carta
            src={cutTable._cards[lastCard()]._imgBack}
            src75={cutTable._cards[lastCard()]._imgBack}
          />
        </div>
      ) : (
        <div>
          <div className="virtualCard"></div>
        </div>
      )}
    </div>
  );
}
