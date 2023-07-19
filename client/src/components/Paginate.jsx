/* eslint-disable react/prop-types */
import styles from "../styles/cards.module.css";

function Paginate({ cantPage }) {
  return (
    <footer className={styles.paginate}>
      1 de <span className={styles.numPage}>{cantPage}</span>
    </footer>
  );
}

export default Paginate;
