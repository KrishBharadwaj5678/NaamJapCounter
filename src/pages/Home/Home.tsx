import { useEffect, useMemo, useRef, useState } from "react";
import gsap from "gsap";
import radhaPremanandJi from "../../assets/audio/radha.m4a";
import JSConfetti from "js-confetti";
import Navbar from "./components/Navbar";
import JapTimer from "./components/JapTimer";
import ProgressBar from "./components/ProgressBar";
import StatsCard from "./components/StatsCard";
import FullScreen from "./components/FullScreen";
import CursorAnimation from "./components/CursorAnimation";

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

let Home = ({ toggleTheme, theme }: HomeProps) => {
  let [currentJapa, setCurrentJapa] = useState(0);
  let [cursorText, setCursorText] = useState<Cursor[]>([]);
  let [progressCount, setProgressCount] = useState(0);
  let [chant, setChant] = useState(true);
  let [fullScreen, setFullScreen] = useState(false);

  let todayJapa = useMemo(
    () => Number(localStorage.getItem("radhaJapa")) | 0,
    []
  );

  let [totalMala, setTotalMala] = useState(
    Number(localStorage.getItem("totalMala"))
  );
  let [time, setTime] = useState({
    hour: 0,
    min: 0,
    sec: 0,
  });

  let jsConfetti = useRef(new JSConfetti());

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
    let screenWidth = window.innerWidth;

    jsConfetti.current.addConfetti({
      emojis: ["🌸"],
      emojiSize: screenWidth <= 700 ? 90 : 55,
      confettiNumber: screenWidth <= 700 ? 15 : 20,
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

  // Whenever either currentJapa or totalMala changes, React re-runs this effect
  useEffect(() => {
    localStorage.setItem("radhaJapa", String(todayJapa + currentJapa));
    localStorage.setItem("totalMala", String(totalMala));
  }, [currentJapa, totalMala]);

  return (
    <div
      className="w-full h-screen md:overflow-hidden select-none"
      onClick={handleClick}
    >
      {/* Radha Text Animation */}
      <CursorAnimation cursorText={cursorText} />

      {/* Navbar */}
      <Navbar
        theme={theme}
        handleChants={handleChants}
        chant={chant}
        toggleTheme={toggleTheme}
      />

      {/* Jap Timer */}
      <JapTimer theme={theme} time={time} />

      {/* Progress Bar */}
      <ProgressBar progressCount={progressCount} currentJapa={currentJapa} />

      {/* Stats Cards */}
      <div className="flex justify-center mt-9 gap-5">
        <StatsCard
          theme={theme}
          emoji="📿"
          label="Total Malas"
          value={totalMala}
        />
        <StatsCard
          theme={theme}
          emoji="🪷"
          label="Total Japa"
          value={todayJapa + currentJapa}
        />
      </div>

      {/* Full Screen */}
      <FullScreen fullScreen={fullScreen} toggleFullScreen={toggleFullScreen} />
    </div>
  );
};

export default Home;
