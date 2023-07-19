/* eslint-disable react/prop-types */
import styles from "../styles/card.module.css";

function Card({ nombre, imagen, tipos }) {
  return (
    <div className={styles.card}>
      <h1 className={styles.title}>{nombre}</h1>
      <img className={styles.image} src={imagen} alt={"imagen de " + nombre} />
      
      {tipos && 
      <div className={styles.tipos}>
        {tipos.map((tipo, index) => <h3 key={index} className={`${styles[tipo]} ${styles.tipo}`}>{tipo}</h3>)}
      </div>
      }
    </div>
  );
}

export default Card;
