import React, { useEffect, useState } from "react";
import "./carta.css";

export function Carta({
  functionToExecute = () => {},
  textToShow,
  inGame = false,
  src,
  src75,
  srcInGame,
  srcInGame75,
  index = null,
  showButton = false,
}) {
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    function handleResize() {
      setWidth(window.innerWidth);
    }
    window.addEventListener("resize", handleResize);

    return function cleanup() {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="relative  ">
      <img
        alt="Imagen de la carta"
        src={
          width > 640
            ? inGame
              ? srcInGame
              : src
            : inGame
            ? srcInGame75
            : src75
        }
      ></img>

      <div
        className={
          showButton
            ? " focus:outline-none text-xs sm:text-base h-8 w-full font-Mate   text-center rounded-b-sm  text-white  bg-gray-600 bg-opacity-60 text-opacity-80 hover:text-opacity-100  hover:bg-opacity-90 absolute bottom-0"
            : "  h-8 w-full  font-Mate  text-center rounded-b-lg text-white  bg-gray-600 bg-opacity-70 absolute bottom-0 invisible"
        }
        onClick={() => {
          functionToExecute(index);
        }}
      >
        {textToShow}
      </div>
    </div>
  );
}
