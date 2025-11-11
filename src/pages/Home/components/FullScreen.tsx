import { Maximize, Minimize } from "lucide-react";

interface FullScreen {
  fullScreen: boolean;
  toggleFullScreen: () => void;
}

let FullScreen = ({ fullScreen, toggleFullScreen }: FullScreen) => {
  return (
    <div className="flex justify-center mt-7 md:mt-8.5 pb-6 md:pb-0">
      <div
        className="flex items-center text-xl gap-2 px-4 py-2 rounded-lg border-2 border-[#F97316] hover:bg-[#F97316] main cursor-pointer transition-colors duration-200 text-[#F97316] hover:text-white"
        onClick={toggleFullScreen}
      >
        {!fullScreen ? <Maximize size={18} /> : <Minimize size={18} />}

        <button>{!fullScreen ? "Full Screen" : "Exit Full Screen"}</button>
      </div>
    </div>
  );
};

export default FullScreen;
