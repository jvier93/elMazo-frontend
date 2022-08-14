import { useEffect, useState } from "react";
import { socket } from "./../components/Socket";
export function usePrueba() {
  const [mensajeDePrueba, setMensajeDePrueba] = useState("");

  useEffect(() => {
    const handlePrueba = function (mensaje) {
      setMensajeDePrueba(mensaje);
      console.log("se recibio el mensaje de prueba");
    };

    socket.on("prueba", handlePrueba);

    return () => {
      socket.off("prueba", handlePrueba);
    };
  }, [mensajeDePrueba]);

  return mensajeDePrueba;
}
