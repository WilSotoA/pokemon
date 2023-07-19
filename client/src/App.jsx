import { useEffect } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPokemon } from "./redux/actions";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Detail from "./components/Detail";
import "./styles/app.css";

function App() {

  const { VITE_SERVER_URL } = import.meta.env;
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get(`${VITE_SERVER_URL}`)
      .then((result) => {
        dispatch(addPokemon(result.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [VITE_SERVER_URL, dispatch]);

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
