import { useState } from "react";
import "./App.css";
import "rsuite/dist/rsuite.min.css";
import Home from "./pages/Home/Home";
import { CustomProvider } from "rsuite";

function App() {
  let [theme, setTheme] = useState<"light" | "dark">("light");

  let toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <CustomProvider theme={theme}>
      {/* This is called Prop passing / drilling. Alternative way is to use React Context */}
      <Home toggleTheme={toggleTheme} theme={theme} />
    </CustomProvider>
  );
}

export default App;
