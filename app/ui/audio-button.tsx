import { useRef, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";
import { useLocaleContext } from "../components/context/locale-provider";

export default function AudioButton() {
  const { dict } = useLocaleContext();
  const audioRef = useRef<HTMLAudioElement>(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (!audioRef.current) {
      return;
    }
    const audio = audioRef.current;
    audio.loop = true;
    audio.play();

    setIsPlaying(true);
    audio
      .play()
      .then(() => {
        setIsPlaying(true);
      })
      .catch((error) => {
        console.error("Error playing audio:", error);
      });
    // console.log("Playing audio");
  };

  const pauseAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div>
      <button
        className="absolute right-0 top-[200px] z-30 h-[40px] w-[70px] cursor-pointer items-center justify-center rounded-full rounded-r-md bg-white px-[15px] shadow-lg translate-x-2 hover:shadow-xl hover:-translate-x-0 dark:bg-black"
        onClick={() => {
          isPlaying ? pauseAudio() : playAudio();
        }}
      >
        {isPlaying ? (
          <SpeakerWaveIcon className="h-6 w-6" title={dict.header.pauseAudio} />
        ) : (
          <SpeakerXMarkIcon className="h-6 w-6" title={dict.header.playAudio} />
        )}
      </button>
      <audio ref={audioRef} src="/audio/bgm-cute.mp3" />
    </div>
  );
}
