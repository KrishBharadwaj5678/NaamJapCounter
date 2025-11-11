interface Cursor {
  id: number;
  x: number;
  y: number;
}

interface CursorAnimation {
  cursorText: Cursor[];
}

const CursorAnimation = ({ cursorText }: CursorAnimation) => {
  return (
    <>
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
    </>
  );
};

export default CursorAnimation;
