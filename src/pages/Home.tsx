import React, { useEffect, useMemo, useRef, useState } from "react";
import { Button, Progress } from "rsuite";
import {
  Sun,
  Moon,
  Volume2,
  VolumeOff,
  Timer,
  Maximize,
  Minimize,
} from "lucide-react";
import gsap from "gsap";
import radhaPremanandJi from "../assets/audio/radha.m4a";
import JSConfetti from "js-confetti";

// Defining the structure
interface HomeProps {
  theme: "light" | "dark";
  toggleTheme: () => void; // () => void means, The function takes no arguments, It doesn’t return anything.
}

interface Cursor {
  id: number;
  x: number;
  y: number;
}

const Home = ({ toggleTheme, theme }: HomeProps) => {
  let [currentJapa, setCurrentJapa] = useState(0);

  const todayJapa = useMemo(
    () => Number(localStorage.getItem("radhaJapa")) | 0,
    []
  );

  const [cursorText, setCursorText] = useState<Cursor[]>([]);
  let [progressCount, setProgressCount] = useState(0);
  let [chant, setChant] = useState(true);
  let [totalMala, setTotalMala] = useState(
    Number(localStorage.getItem("totalMala"))
  );
  let [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });
  let [fullScreen, setFullScreen] = useState(false);

  const jsConfetti = useRef(new JSConfetti());

  let radhaChant = new Audio(radhaPremanandJi);

  let handleClick = (e: any) => {
    setCurrentJapa((prev) => prev + 1);
    setProgressCount((prev) => prev + 1);

    if (chant) {
      radhaChant.play();
    }

    if (progressCount >= 100) {
      setProgressCount(1);
      setTotalMala((prev) => prev + 1);
      handleCelebrate();
    }
    let newCursor: Cursor = {
      id: Date.now(),
      x: e.clientX,
      y: e.clientY,
    };

    setCursorText((prev) => [...prev, newCursor]);

    // Animate
    setTimeout(() => {
      let element = document.getElementById(`${newCursor.id}`);
      if (element) {
        gsap.to(element, {
          opacity: 0,
          y: -50,
          scale: 1.5,
          duration: 0.5,
          ease: "power2.out",
          onComplete: () => {
            setCursorText((prev) => prev.filter((r) => r.id !== newCursor.id));
          },
        });
      }
    }, 100);
  };

  let handleChants = () => {
    setChant((prev) => {
      let newChant = !prev;
      if (newChant) {
        radhaChant.play();
      } else {
        radhaChant.pause();
      }
      return newChant;
    });
  };

  // Timer Logic
  useEffect(() => {
    let timer;

    timer = setInterval(() => {
      setTime((prev) => {
        let { hour, min, sec } = prev;
        sec++;

        if (sec >= 60) {
          sec = 0;
          min++;
        }

        if (min >= 60) {
          min = 0;
          hour++;
        }

        return { hour, min, sec };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format the time
  let formatTime = (unit: number) => String(unit).padStart(2, "0");

  // Toggle FullScreen
  let toggleFullScreen = () => {
    let element = document.documentElement;

    if (!document.fullscreenElement) {
      element.requestFullscreen();
      setFullScreen(true);
    } else {
      document.exitFullscreen();
      setFullScreen(false);
    }
  };

  // Flowers Confetti
  let handleCelebrate = () => {
    jsConfetti.current.addConfetti({
      emojis: ["🌸"],
      emojiSize: 40,
      confettiNumber: 35,
    });
  };

  useEffect(() => {
    localStorage.setItem("radhaJapa", String(todayJapa + currentJapa));
  }, [currentJapa]);

  useEffect(() => {
    localStorage.setItem("totalMala", String(totalMala));
  }, [totalMala]);

  // localStorage.clear();

  return (
    <div
      className="w-full h-screen md:overflow-hidden select-none"
      onClick={handleClick}
    >
      {/* Radha Text Animation */}
      {cursorText.map((r) => (
        <span
          key={r.id}
          id={`${r.id}`}
          className="absolute text-xl md:text-2xl font-bold text-[#F16511] radhe select-none pointer-events-none"
          style={{
            top: r.y,
            left: r.x,
            transform: "translate(-50%, -50%)",
          }}
        >
          राधा
        </span>
      ))}

      {/* Navbar */}
      <div className="w-full flex items-center justify-between mt-7 px-4.5 md:px-6">
        {/* Chant Button */}
        <button
          className={`${
            theme === "light" ? "!bg-[#FDF8EA]" : "!bg-[#3C210E]"
          } !rounded-full px-3 py-3`}
          onClick={handleChants}
        >
          {chant ? (
            <Volume2
              className={`${
                theme === "light" ? "text-[#F97316]" : "text-white"
              }`}
            />
          ) : (
            <VolumeOff
              className={`${
                theme === "light" ? "text-[#F97316]" : "text-white"
              }`}
            />
          )}
        </button>

        {/* Heading */}
        <p className="text-[#F16511] text-4xl md:text-5xl text-center radhe">
          राधा नाम जप
        </p>

        {/* Light/Dark Mode */}
        <Button
          appearance="default"
          onClick={toggleTheme}
          className={`${
            theme === "light" ? "!bg-[#FDF8EA]" : "!bg-[#3C210E]"
          } !rounded-full !px-3 !py-3`}
        >
          {theme === "light" ? <Sun className="text-[#F97316]" /> : <Moon />}
        </Button>
      </div>
      {/* Timer */}
      <div className="flex justify-center mt-6 text-lg main">
        <div
          className={`${
            theme === "light" ? "bg-[#F1F5F9]" : "bg-[#3C210E] text-[#F16511]"
          } px-5 py-3 rounded-full`}
        >
          <div className="flex gap-2">
            <Timer />
            {`${formatTime(time.hour)}:${formatTime(time.min)}:${formatTime(
              time.sec
            )}`}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="flex justify-center items-center mt-9 md:mt-14">
        <div className="w-50 relative">
          <Progress.Circle
            percent={progressCount}
            strokeColor="#F97316"
            showInfo={false}
            trailWidth={4}
            strokeWidth={4}
            trailColor="#E2E8F0"
          />
          <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-5xl font-semibold main">
            {currentJapa}
          </span>
        </div>
      </div>
      {/* Cards */}
      <div className="flex justify-center mt-9 gap-5">
        {/* Malas */}
        <div
          className={`${
            theme === "light"
              ? "bg-[#FDF8EA] border-[#FED7AA]"
              : "bg-[#3C210E] border-[#874E23]"
          } px-6 py-5 rounded-xl border-2 text-center transition-colors duration-300`}
        >
          <p className={`text-3xl`}>📿</p>
          <p
            className={`${
              theme === "light" ? "text-black" : "text-[#F16511]"
            } text-xl main font-medium`}
          >
            Total Malas
          </p>
          <p
            className={`${
              theme === "light" ? "text-black" : "text-[#F16511]"
            } text-xl main font-bold`}
          >
            {totalMala}
          </p>
        </div>

        {/* Total Japa */}
        <div
          className={`${
            theme === "light"
              ? "bg-[#FDF8EA] border-[#FED7AA]"
              : "bg-[#3C210E] border-[#874E23]"
          } px-6 py-5 rounded-xl  border-2 text-center transition-colors duration-300`}
        >
          <p className={`text-3xl`}>🪷</p>
          <p
            className={`${
              theme === "light" ? "text-black" : "text-[#F16511]"
            } text-xl main font-medium`}
          >
            Total Japa
          </p>
          <p
            className={`${
              theme === "light" ? "text-black" : "text-[#F16511]"
            } text-xl main font-bold`}
          >
            {todayJapa + currentJapa}
          </p>
        </div>
      </div>

      {/* Full Screen */}
      <div className="flex justify-center mt-7 md:mt-8.5 pb-6 md:pb-0">
        <div
          className="flex items-center text-xl gap-2 px-4 py-2 rounded-lg border-2 border-[#F97316] hover:bg-[#F97316] main cursor-pointer transition-colors duration-200 text-[#F97316] hover:text-white"
          onClick={toggleFullScreen}
        >
          {!fullScreen ? <Maximize size={18} /> : <Minimize size={18} />}

          <button>{!fullScreen ? "Full Screen" : "Exit Full Screen"}</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
