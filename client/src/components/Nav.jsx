import styles from "../styles/nav.module.css";

function Nav() {
  return (
    <nav className={styles.nav}>
      <div className={styles.containerLogo}>
        <img
          className={styles.logo}
          src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png"
          alt="Logo Pokemon"
        />
      </div>
      <div className={styles.searchBar}>
        <label className={styles.text} htmlFor="search">
          Pokemon:
        </label>
        <div className={styles.containerSubmit}>
        <input
          className={styles.input}
          type="search"
          id="search"
          placeholder="Pikachu, Bulbasour, Squirtle"
        />
        <button className={styles.submit} type="submit">Buscar</button>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
