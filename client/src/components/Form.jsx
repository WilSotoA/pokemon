import { useState } from "react";
import styles from "../styles/form.module.css";
import pokemon from "../assets/pokemon.png";

function Form() {
  const [inputs, setInputs] = useState({
    name: "",
    image: "",
    health: "",
    attack: "",
    defense: "",
    speed: "",
    height: "",
    weight: "",
  });
  const [errors, setErrors] = useState([]);

  function handleChange(e) {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
  }

  return (
    <div className={styles.containerForm}>
      <div className={styles.image}>
        <h3>Complete los * obligatorios</h3>
        {errors.length > 0 &&
          errors.map((err, index) => <h6 key={index}>{err}</h6>)}
        <img
          src={inputs.image}
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
            name="name"
            placeholder="Charizard"
            value={inputs.name}
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
            name="image"
            placeholder="http://charizard.com"
            value={inputs.image}
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
            name="health"
            placeholder="100"
            value={inputs.health}
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
            name="attack"
            placeholder="80"
            value={inputs.attack}
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
            name="defense"
            placeholder="60"
            value={inputs.defense}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="speed">Velocidad </label>
          <input
            type="number"
            id="speed"
            name="speed"
            placeholder="120"
            value={inputs.speed}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="height">Altura </label>
          <input
            type="number"
            id="height"
            name="height"
            placeholder="7 dm"
            max="200"
            value={inputs.height}
            onChange={handleChange}
          />
        </div>
        <div className={styles.container}>
          <label htmlFor="weight">Peso </label>
          <input
            type="number"
            id="weight"
            name="weight"
            placeholder="69 hg"
            max="9999"
            value={inputs.weight}
            onChange={handleChange}
          />
        </div>
        <button className={styles.submit} type="submit">
          Crear
        </button>
      </form>
    </div>
  );
}

export default Form;
