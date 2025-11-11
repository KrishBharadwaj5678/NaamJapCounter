import { Sun, Moon, Volume2, VolumeOff } from "lucide-react";
import { Button } from "rsuite";

interface Navbar {
  theme: "light" | "dark";
  handleChants: () => void;
  chant: boolean;
  toggleTheme: () => void;
}

let Navbar = ({ theme, handleChants, chant, toggleTheme }: Navbar) => {
  return (
    <>
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
    </>
  );
};

export default Navbar;
