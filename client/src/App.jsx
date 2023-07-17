import { Routes, Route } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import "./styles/app.css";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
