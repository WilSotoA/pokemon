import { useEffect } from "react";
import axios from "axios";
import { Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addPokemon, addTypes } from "./redux/actions";
import Landing from "./components/Landing";
import Home from "./components/Home";
import Form from "./components/Form";
import Detail from "./components/Detail";
import "./styles/app.css";
import Nav from "./components/Nav";

function App() {
  const { VITE_SERVER_URL } = import.meta.env;
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  // Cargar todos los pokemones al estado global
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

  //cargar los tipos de pokemones al estado global
  useEffect(() => {
    axios
      .get(`${VITE_SERVER_URL}types`)
      .then((result) => {
        dispatch(addTypes(result.data));
      })
      .catch((error) => {
        console.error(error.message);
      });
  }, [VITE_SERVER_URL, dispatch]);

  return (
    <div className="App">
      {pathname === "/" ? null : <Nav />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/form" element={<Form />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
