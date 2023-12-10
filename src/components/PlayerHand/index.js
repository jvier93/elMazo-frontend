import React, { useState, useEffect } from "react";
import { socket } from "./../Socket";
import "./PlayerHand.css";
import { Carta } from "../Carta";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { usePlaySound } from "../../hooks/usePlaySound";

export const PlayerHand = ({
  gameStatus,
  cutMode,
  inTurn,
  hands,
  myHand,
  sound,
  setCutMode,
}) => {
  const [showButton, setShowButton] = useState(false);
  const [hand, setHand] = useState([]);
  console.log(hand);
  const [showFront, setShowFront] = useState(false);

  useEffect(() => {
    function handleShowFrontCards(showFront) {
      setShowFront(showFront);
    }
    socket.on("showFrontCards", handleShowFrontCards);

    return () => {
      socket.off("showFrontCards", handleShowFrontCards);
    };
  }, []);

  const { play: playDrag } = usePlaySound({ sound: "deslizar1" });
  const { play } = usePlaySound({ sound: "deslizar2" });
  function playCard(index /*Indice de la carta que quiero jugar en myHand */) {
    if (socket.connected) {
      socket.emit("playCard", index);
      if (sound) {
        play();
      }
    } else {
      console.log("no esta conectado al servidor");
    }
  }

  function cutGame(index) {
    /*Indice de la carta con la que quiero cortar el juego */
    socket.emit("cutGame", index);
    if (sound) {
      play();
    }
    setCutMode(false);
  }

  useEffect(() => {
    setHand(hands);

    if (myHand && inTurn && hands.length === 8 && gameStatus === "iniciado") {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [hands, gameStatus, inTurn, myHand]);

  function handleOnDragEnd(event) {
    const handCards = hand.slice();

    //Quitamos la carta que se movio del lugar en el que estaba
    const [reorderedCards] = handCards.splice(event.source.index, 1);
    if (event.destination !== null) {
      //Colocamos la carta que se movio en su nuevo lugar
      handCards.splice(event.destination.index, 0, reorderedCards);
      //Si quito este estado al ordenar las cartas me aprece un "destello de lag" en las cartas cuando finaliza el evento de drop.
      setHand(handCards);
      socket.emit("reorderCards", handCards);

      if (sound) {
        playDrag();
      }
    }
  }

  if (myHand) {
    return (
      <div>
        {hand !== null ? (
          <DragDropContext
            onDragEnd={
              cutMode
                ? () => {
                    console.log(
                      "no se puede mover, debe elegir una carta con la cual cortar"
                    );
                  }
                : handleOnDragEnd
            }
          >
            <Droppable droppableId="idBaraja" direction="horizontal">
              {(provided) => (
                <div
                  className={
                    inTurn
                      ? "  mx-auto p-1  h-24 sm:h-32 w-80 sm:w-96 flex justify-start items-center -space-x-4 sm:-space-x-7 border-2 border-b-0 border-solid  border-gray-200 rounded-t-lg   md:border-b-2 md:rounded-none md:rounded-l-lg md:border-r-0 md:rounded-r-none  "
                      : "  mx-auto p-1  h-24 sm:h-32 w-80 sm:w-96 flex items-center -space-x-4 sm:-space-x-7 border-2 border-b-0 border-dotted  border-gray-200 rounded-t-lg  justify-start md:border-b-2 md:rounded-none md:rounded-l-lg md:border-r-0 md:rounded-r-none  "
                  }
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {hand.map(
                    (
                      {
                        _imgFront,
                        _imgFrontGame,
                        _imgFrontGame75,
                        _inGame,
                        _imgFront75,
                      },
                      index
                    ) => {
                      return (
                        <Draggable
                          key={index}
                          draggableId={index + "card"}
                          index={index}
                        >
                          {(provided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                            >
                              <Carta
                                functionToExecute={cutMode ? cutGame : playCard}
                                functionToCutGame={cutGame}
                                inGame={_inGame}
                                cardIn={"player"}
                                myHand={myHand}
                                showButton={
                                  (showButton && !cutMode) ||
                                  (showButton && cutMode && !_inGame)
                                    ? true
                                    : false
                                }
                                textToShow={cutMode ? "Cortar" : "Tirar"}
                                index={index}
                                src={_imgFront}
                                src75={_imgFront75}
                                srcInGame={_imgFrontGame}
                                srcInGame75={_imgFrontGame75}
                                sound={sound}
                              ></Carta>
                            </div>
                          )}
                        </Draggable>
                      );
                    }
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        ) : (
          <div>{console.log("la mano es null")}</div>
        )}
      </div>
    );
  } else {
    return (
      <div>
        {hand !== null ? (
          <div
            className={
              inTurn
                ? "mx-auto p-1  h-24 sm:h-32  w-80 sm:w-96 flex items-center  -space-x-4 sm:-space-x-7 border-2 border-b-0 border-solid  border-gray-200 rounded-t-lg  justify-start md:border-b-2 md:rounded-none md:rounded-l-lg md:border-r-0 md:rounded-r-none   "
                : "mx-auto p-1  h-24 sm:h-32  w-80 sm:w-96 flex items-center -space-x-4 sm:-space-x-7 border-2 border-b-0 border-dotted  border-gray-200 rounded-t-lg  justify-start md:border-b-2 md:rounded-none md:rounded-l-lg md:border-r-0 md:rounded-r-none  "
            }
          >
            {hand.map(
              (
                { _imgBack, _imgFront, _imgBack75, _imgFront75, _suit },
                index
              ) => {
                return (
                  <Carta
                    key={index}
                    src75={showFront ? _imgFront75 : _imgBack75}
                    src={showFront ? _imgFront : _imgBack}
                    suit={_suit}
                  ></Carta>
                );
              }
            )}
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
};
