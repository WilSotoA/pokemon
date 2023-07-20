/* eslint-disable react/prop-types */
import styles from "../styles/cards.module.css";
import { prevPage, nextPage } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";

function Paginate({ cantPage }) {
  const numPage = useSelector((state) => state.numPage);
  const dispatch = useDispatch();

  return (
    <footer className={styles.paginate}>
      <span className={styles.navigate} onClick={() => dispatch(prevPage())}>
        ⬅
      </span>
      {numPage} de <span className={styles.numPage}>{cantPage}</span>
      <span className={styles.navigate} onClick={() => dispatch(nextPage())}>
        ➡
      </span>
    </footer>
  );
}

export default Paginate;
