import { useEffect, useState } from "react";
import styles from "../styles/detail.module.css";
import axios from "axios";
import imgPokemon from "../assets/pokemon.png";
import { useParams } from "react-router-dom";

function Detail() {
  const { VITE_SERVER_URL } = import.meta.env;
  const { id } = useParams();
  const [pokemon, setPokemon] = useState({});

  useEffect(() => {
    axios(`${VITE_SERVER_URL}detail/${id}`)
    .then(({ data }) => {
        setPokemon(data)
    })
    .catch((error) => {
      console.error(error);
    })
    return setPokemon({});
  }, [VITE_SERVER_URL, id]);

  return (
    <div className={styles.detail}>
      <section className={styles.details}>
        <div className={styles.header}>
          <h1>N° {pokemon?.id}</h1>
          <h1>{pokemon?.nombre}</h1>
        </div>
        <picture className={styles.containerImage}>
          <img
            className={styles.image}
            src={pokemon?.imagen}
            alt={`imagen de ${pokemon?.nombre}`}
            onError={(e) => (e.target.src = imgPokemon)}
          />
        </picture>
        <div className={styles.tipos}>
          {pokemon?.tipos &&
            pokemon.tipos.map((tipo, index) => {
              return (
                <h1 key={index} className={`${styles[tipo]} ${styles.tipo}`}>
                  {tipo}
                </h1>
              );
            })}
        </div>
      </section>
      <section className={`${styles.details} ${styles.detailsStats}`}>
        <div>
          <h3 className={styles.nameStat}>💛 Vida:</h3>
          <div className={styles.stats}>
            <div
              className={`${styles.stat}`}
              style={{ width: `${pokemon.vida / 2}%` }}
            >
              {pokemon?.vida}
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.nameStat}>⚔ Ataque:</h3>
          <div className={styles.stats}>
            <div
              className={`${styles.stat}`}
              style={{ width: `${pokemon.ataque / 2}%` }}
            >
              {pokemon?.ataque}
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.nameStat}>🛡 Defensa:</h3>
          <div className={styles.stats}>
            <div
              className={`${styles.stat}`}
              style={{ width: `${pokemon.defensa / 2}%` }}
            >
              {pokemon.defensa}
            </div>
          </div>
        </div>
        {pokemon.velocidad && (
          <div>
            <h3 className={styles.nameStat}>⚡ Velocidad:</h3>
            <div className={styles.stats}>
              <div
                className={`${styles.stat}`}
                style={{ width: `${pokemon.velocidad / 2}%` }}
              >
                {pokemon.velocidad}
              </div>
            </div>
          </div>
        )}
        <div className={styles.measures}>
          {pokemon.altura && (
            <div>
              <h3 className={styles.nameStat}>↕ Altura: </h3>
              <h2 className={styles.measure}>
                {(pokemon?.altura / 10).toFixed(1)} M
              </h2>
            </div>
          )}
          {pokemon.peso && (
            <div>
              <h3 className={styles.nameStat}>🏋 Peso: </h3>
              <h2 className={styles.measure}>
                {(pokemon?.peso / 10).toFixed(1)} Kg
              </h2>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default Detail;
