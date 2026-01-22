interface ProgressBarProps {
  progressCount: number;
  currentJapa: number;
}

const ProgressBar = ({ progressCount, currentJapa }: ProgressBarProps) => {
  const radius = 70;
  const strokeWidth = 6;
  const size = 160;
  const center = size / 2;

  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progressCount / 108) * circumference;

  return (
    <div className="flex justify-center items-center my-8 md:my-12">
      <div className="relative w-46 h-46 md:w-51 md:h-51">
        <svg
          className="w-full h-full -rotate-90"
          viewBox={`0 0 ${size} ${size}`}
        >
          {/* Trail */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#E2E8F0"
            strokeWidth={strokeWidth}
            fill="transparent"
          />

          {/* Progress */}
          <circle
            cx={center}
            cy={center}
            r={radius}
            stroke="#F97316"
            strokeWidth={strokeWidth}
            fill="transparent"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            className="transition-all duration-300"
          />
        </svg>

        {/* Center Text */}
        <span className="absolute inset-0 flex items-center justify-center text-6xl font-semibold main">
          {currentJapa}
        </span>
      </div>
    </div>
  );
};

export default ProgressBar;
