import { useState } from "react";
import styles from "../styles/form.module.css";
import pokemon from "../assets/pokemon.png";
import { handleInputChange, handleFormSubmit } from "../utils/handleForm";
import { useDispatch, useSelector } from "react-redux";
import Modal from "./Modal";

function Form() {
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
  const [modal, setModal] = useState([]);

  const handleChange = (e) => {
    handleInputChange(e, inputs, setInputs, setErrors);
  };

  const handleSubmit = async (e) => {
    handleFormSubmit(
      e,
      inputs,
      errors,
      setInputs,
      setErrors,
      setModal,
      dispatch
    );
  };

  return (
    <>
      {modal.length > 0 && (
        <Modal
          title={modal[0]}
          message={modal[1]}
          onClose={() => {
            setModal("");
          }}
        />
      )}
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
              <div className={`tipos ${styles.tipos}`}>
                {inputs.tipos.map((tipo, index) => (
                  <div
                    className={styles.delete}
                    key={index}
                    onClick={() =>
                      setInputs({
                        ...inputs,
                        tipos: inputs.tipos?.filter((tipos) => tipos !== tipo),
                      })
                    }
                  >
                    <h3 className={`tipo ${tipo} ${styles.tipo}`}>{tipo}</h3>
                  </div>
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
    </>
  );
}

export default Form;
