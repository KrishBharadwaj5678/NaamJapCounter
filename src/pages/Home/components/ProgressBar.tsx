import { Progress } from "rsuite";

interface ProgressBar {
  progressCount: number;
  currentJapa: number;
}

const ProgressBar = ({ progressCount, currentJapa }: ProgressBar) => {
  return (
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
  );
};

export default ProgressBar;
