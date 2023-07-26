import { useState } from "react";
import styles from "../styles/form.module.css";
import pokemon from "../assets/pokemon.png";
import validate from "../utils/validate";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { addPokemon } from "../redux/actions";

function Form() {
  const { VITE_SERVER_URL } = import.meta.env;

  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    nombre: "",
    imagen: "",
    vida: "",
    ataque: "",
    defensa: "",
    velocidad: "",
    altura: "",
    peso: "",
    tipos: [],
  });
  const [errors, setErrors] = useState(["Complete los campos * obligatorios"]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "tipos") {
      if (value && !inputs.tipos.includes(value)) {
        setInputs({
          ...inputs,
          tipos: [...inputs.tipos, value],
        });
        setErrors(
          validate({
            ...inputs,
            tipos: [...inputs.tipos, value],
          })
        );
      }
    } else {
      setInputs({
        ...inputs,
        [name]: value,
      });

      setErrors(
        validate({
          ...inputs,
          [name]: value,
        })
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (errors.length > 0) return alert("Complete las validaciones");
    try {
      const newPokemon = {
        ...inputs,
        vida: parseInt(inputs.vida),
        ataque: parseInt(inputs.ataque),
        defensa: parseInt(inputs.defensa),
        velocidad: parseInt(inputs.velocidad),
        altura: parseInt(inputs.altura),
        peso: parseInt(inputs.peso),
      };
      const { data } = await axios.post(VITE_SERVER_URL, newPokemon);
      dispatch(addPokemon(data));
      setInputs({
        nombre: "",
        imagen: "",
        vida: "",
        ataque: "",
        defensa: "",
        velocidad: "",
        altura: "",
        peso: "",
        tipos: [],
      });
      setErrors(["Complete los campos * obligatorios"]);
      alert("¡Se creo el Pokemon con Exito!");
    } catch (error) {
      alert("Error al crear el Pokemon");
      console.error(error.message);
    }
  };

  return (
    <div className={styles.containerForm}>
      <div className={styles.image}>
        {errors.length > 0 && (
          <ul>
            {errors.map((err, index) => (
              <li className={styles.required} key={index}>
                {err}
              </li>
            ))}
          </ul>
        )}
        <img
          src={inputs.imagen}
          alt="imagen de pokemon"
          onError={(e) => (e.target.src = pokemon)}
        />
      </div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.container}>
          <label htmlFor="name">
            Nombre <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="name"
            name="nombre"
            placeholder="Charizard"
            value={inputs.nombre}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="image">
            Imagen <span className={styles.required}>*</span>
          </label>
          <input
            type="text"
            id="image"
            name="imagen"
            placeholder="http://charizard.com/char.jpg"
            value={inputs.imagen}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="health">
            Vida <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="health"
            name="vida"
            placeholder="100"
            value={inputs.vida}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="attack">
            Ataque <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="attack"
            name="ataque"
            placeholder="80"
            value={inputs.ataque}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="defense">
            Defensa <span className={styles.required}>*</span>
          </label>
          <input
            type="number"
            id="defense"
            name="defensa"
            placeholder="60"
            value={inputs.defensa}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="speed">Velocidad </label>
          <input
            type="number"
            id="speed"
            name="velocidad"
            placeholder="120"
            value={inputs.velocidad}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="height">Altura </label>
          <input
            type="number"
            id="height"
            name="altura"
            placeholder="7 dm"
            value={inputs.altura}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="weight">Peso </label>
          <input
            type="number"
            id="weight"
            name="peso"
            placeholder="69 hg"
            value={inputs.peso}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="types">Tipos: </label>
          <select
            className={styles.select}
            name="tipos"
            id="types"
            onChange={handleChange}
          >
            <option value="">Tipo</option>
            {types &&
              types.map((type) => (
                <option key={type.id} value={type.nombre}>
                  {type.nombre}
                </option>
              ))}
          </select>
        </div>
        <div className={styles.container}>
          {inputs.tipos.length > 0 && (
            <div className="tipos">
              {inputs.tipos.map((tipo, index) => (
                <h3 key={index} className={`tipo ${tipo}`}>
                  {tipo}
                </h3>
              ))}
            </div>
          )}
        </div>
        <button
          className={`${styles.submit} ${errors.length > 0 && styles.block}`}
          type="submit"
          disabled={errors.length > 0 ? true : false}
        >
          Crear
        </button>
      </form>
    </div>
  );
}

export default Form;
