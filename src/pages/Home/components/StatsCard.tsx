interface StatsCard {
  theme: "light" | "dark";
  emoji: string;
  label: string;
  value: number;
}

const StatsCard = ({ theme, emoji, label, value }: StatsCard) => {
  return (
    <div
      className={`${
        theme === "light"
          ? "bg-[#FDF8EA] border-[#FED7AA]"
          : "bg-[#3C210E] border-[#874E23]"
      } px-6 py-5 rounded-xl border-2 text-center transition-colors duration-300`}
    >
      <p className={`text-3xl`}>{emoji}</p>
      <p
        className={`${
          theme === "light" ? "text-black" : "text-[#F16511]"
        } text-xl main font-medium`}
      >
        {label}
      </p>
      <p
        className={`${
          theme === "light" ? "text-black" : "text-[#F16511]"
        } text-xl main font-bold`}
      >
        {value}
      </p>
    </div>
  );
};

export default StatsCard;
