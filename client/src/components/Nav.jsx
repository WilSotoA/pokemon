import styles from "../styles/nav.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { searchName } from "../redux/actions";
import { useState } from "react";

function Nav() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [error, setError] = useState(true);

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(searchName(search.trim()));
    setSearch("");
    setError(true);
  }
  function handleChange(e) {
    if (e.target.value) setError(false);
    setSearch(e.target.value);
  }

  return (
    <nav className={styles.nav}>
      <Link to="/home" className={styles.containerLogo}>
        <img
          className={styles.logo}
          src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png"
          alt="Logo Pokemon"
        />
      </Link>
      <Link to="/form" className={styles.submit}>
        Crear Pokemon
      </Link>
      <div className={styles.searchBar}>
        <form onSubmit={handleSubmit}>
          <label className={styles.text} htmlFor="search">
            Pokemon:
          </label>
          <div className={styles.containerSubmit}>
            <input
              className={styles.input}
              type="search"
              id="search"
              placeholder="Pikachu, Bulbasaur, Squirtle"
              value={search}
              onChange={handleChange}
            />
            <button
              className={`${styles.submit} ${error && styles.block}`}
              type="submit"
              disabled={error}
            >
              Buscar
            </button>
          </div>
        </form>
      </div>
    </nav>
  );
}

export default Nav;
