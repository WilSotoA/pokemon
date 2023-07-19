import Card from "./Card";
import styles from "../styles/cards.module.css";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Paginate from "./Paginate";

export default function Cards() {
  const { pokemons, numPage, numCards } = useSelector((state) => state);
  const [cantPage, setCantPage] = useState(1);
  const from = (numPage - 1) * numCards;
  const to = numPage * numCards;
  useEffect(
    () => setCantPage(Math.floor(pokemons.length / numCards) + 1),
    [pokemons, numCards, setCantPage]
  );
  const viewPokemons = pokemons.slice(from, to);
  return (
    <>
      <main className={styles.cardsContainer}>
        {viewPokemons &&
          viewPokemons.map((pokemons) => {
            return (
              <div key={pokemons.id}>
                <Card
                  id={pokemons.id}
                  nombre={pokemons.nombre}
                  imagen={pokemons.imagen}
                  tipos={pokemons.tipos}
                />
              </div>
            );
          })}
        <Paginate cantPage={cantPage} />
      </main>
    </>
  );
}
