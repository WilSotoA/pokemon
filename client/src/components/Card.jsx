/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import styles from "../styles/card.module.css";
import pokemon from "../assets/pokemon.png";

function Card({ id, nombre, imagen, tipos }) {
  return (
    <Link to={`/detail/${id}`}>
      <div className={styles.card}>
        <h1 className={styles.title}>{nombre}</h1>
        <img
          className={styles.image}
          src={imagen}
          alt={"imagen de " + nombre}
          onError={(e) => (e.target.src = pokemon)}
        />

        {tipos && (
          <div className="tipos">
            {tipos.map((tipo, index) => (
              <h3 key={index} className={`tipo ${tipo}`}>
                {tipo}
              </h3>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

export default Card;
