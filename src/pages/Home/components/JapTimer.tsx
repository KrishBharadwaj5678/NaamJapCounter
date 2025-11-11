import { Timer } from "lucide-react";

interface JapTimer {
  theme: "light" | "dark";
  time: { hour: number; min: number; sec: number };
}

const JapTimer = ({ theme, time }: JapTimer) => {
  // Format the time
  let formatTime = (unit: number) => String(unit).padStart(2, "0");

  return (
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
  );
};

export default JapTimer;
