import React from "react";
import useSound from "use-sound";
import music from "../sounds/music.mp3";
import deslizar1 from "../sounds/deslizar1.mp3";
import deslizar2 from "../sounds/deslizar2.mp3";
import message from "../sounds/message.mp3";

//El parametro setSound que por defecto es null, es la funcion que usamos para habilitar o desabilitar le sonido declarada y usada en app
export function usePlaySound({ sound, setSound = null }) {
  let soundToPlay = null;

  if (sound === "music") {
    soundToPlay = music;
  } else if (sound === "message") {
    soundToPlay = message;
  } else if (sound === "deslizar1") {
    soundToPlay = deslizar1;
  } else if (sound === "deslizar2") {
    soundToPlay = deslizar2;
  }

  const [play, { stop }] = useSound(soundToPlay, {
    //Esto es una chanchada pero no tenia otra que hacerlo para lograr un loop si el sonido elegido es musica, cambio el estado de sonido a falso y de nuevo a true para que por flujo normal del programa
    //se ejecutre el metodo play()
    onend: () => {
      if (sound === "music") {
        setSound(false);
        setSound(true);
      }
    },
  });

  return { play, stop };
}
