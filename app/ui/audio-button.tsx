import { useRef, useState } from "react";
import { SpeakerWaveIcon, SpeakerXMarkIcon } from "@heroicons/react/24/solid";

export default function AudioButton() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    if (!audioRef.current) {
      return;
    }
    const audio = audioRef.current;
    audio.play().then(() => {
      setIsPlaying(true);
    }).catch((error) => {
      console.error("Error playing audio:", error);
    });
    console.log("Playing audio");
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
        className="absolute right-0 top-[170px] z-30 h-[40px] w-[70px] cursor-pointer items-center justify-center rounded-full rounded-r-md bg-white px-[15px] shadow-lg hover:shadow-xl dark:bg-black"
        onClick={() => {
          isPlaying ? pauseAudio() : playAudio();
        }}
      >
        {isPlaying ? (
          <SpeakerXMarkIcon className="h-6 w-6" title="Pause audio" />
        ) : (
          <SpeakerWaveIcon className="h-6 w-6" title="Play audio" />
        )}
      </button>
      <audio ref={audioRef} src="/audio/bgm-cute.mp3" />
    </div>
  );
}