import { useEffect, useState } from "react";
import { Recount } from "../Recount/Recount";
import { socket } from "../Socket";

export const ModalNotification = function ({
  showModal,
  //Modal mode va de acuerdo al proposito es el modo en el que se desplegara el modal configurara como se muestra los modos son los siguientes:
  //playerLeave : para cuando un jugador pulsa abandonar juego.
  //endRoundNotification: para cuando una ronda finaliza (cuando un jugador corta).
  //endGameNotification: para cuando el game finaliza osea cuando hay un ganador.
  modalMode,
  setModalMode,
  setShowModal,
  modalMessage,
  setModalMessage,
}) {
  const [scoreDetails, setScoreDetails] = useState([]);

  const handleClickLeave = function () {
    socket.emit("playerLeave");
  };
  const handleClickCancel = function () {
    setShowModal(false);
  };

  useEffect(() => {
    function handlePlayerNotification({
      showModal,
      modalMessage,
      modalMode,
      scoreDetails,
    }) {
      setScoreDetails(scoreDetails);
      setModalMode(modalMode);
      setShowModal(showModal);
      setModalMessage(modalMessage);
    }

    socket.on("playerNotification", handlePlayerNotification);

    return function cleanup() {
      socket.off("playerNotification", handlePlayerNotification);
    };
  }, []);

  return (
    <div
      className={` ${
        showModal ? "" : "hidden"
      } fixed top-0 right-0 left-0 z-50 w-full h-full flex items-center justify-center `}
    >
      <div
        className={`w-80 md:w-96  ${
          modalMode !== "playerLeave" ? "h-80" : "h-32"
        }  bg-gray-200 border-2 border-dotted border-gray-400 rounded-lg flex flex-col justify-around`}
      >
        <div className=" ">
          <h1 className="h-16 font-Mate pl-2 pr-2">{modalMessage.title}</h1>
        </div>

        {modalMode === "endGameNotification" ||
        modalMode === "endRoundNotification" ? (
          <Recount scoreDetails={scoreDetails}></Recount>
        ) : null}
        <p className="h-16 font-Mate pl-2 pr-2">{modalMessage.body}</p>
        <div className="w-full flex justify-center">
          <button
            className="  w-20 h-8 text-sm rounded   text-white font-Mate bg-green-600 px-2  mx-1 md:my-1"
            onClick={
              modalMode === "playerLeave" || modalMode === "endGameNotification"
                ? handleClickLeave
                : handleClickCancel
            }
          >
            Aceptar
          </button>

          {modalMode === "playerLeave" ||
          modalMode === "endGameNotification" ? (
            <button
              className="  w-20 text-sm rounded   text-white font-Mate bg-red-600 px-2  mx-1 md:my-1"
              onClick={handleClickCancel}
            >
              Cancelar
            </button>
          ) : null}
        </div>
      </div>
    </div>
  );
};
