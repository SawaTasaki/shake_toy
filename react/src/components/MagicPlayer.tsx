import { useEffect, useRef } from "react";
import type { Magic } from "../types/magic";

type Props = {
  magic: Magic | null;
};

export default function MagicPlayer({ magic }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!magic) return;

    const audio = new Audio(magic.sound);
    audioRef.current = audio;

    audio.currentTime = 0;
    audio.play().catch(console.error);

    return () => {
      audio.pause();
    };
  }, [magic]);

  if (!magic) {
    return <p>魔法を待っています...</p>;
  }

  return (
    <div>
      <h2>{magic.name}</h2>

      <img
        src={magic.image}
        alt={magic.name}
        width={200}
      />
    </div>
  );
}
