"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [randomAudioFile, setRandomAudioFile] = useState("");

  useEffect(() => {
    const audioFiles = [
      "audio1.mp3",
      "audio2.mp3",
      "audio3.mp3",
      "audio4.mp3",
      "audio5.mp3",
    ];
    const randomFile =
      audioFiles[Math.floor(Math.random() * audioFiles.length)];
    setRandomAudioFile(randomFile);
  }, []);

  return (
    <main className="flex flex-col min-h-screen justify-center items-center p-24">
      <h1 className="text-9xl cursor-pointer" onClick={() => {}}>
        PROCREATE
      </h1>
      <br />
      {randomAudioFile && (
        <audio controls autoPlay>
          <source src={`/${randomAudioFile}`} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      )}
    </main>
  );
}
