/* eslint-disable react/prop-types */
import styles from "../styles/cards.module.css";
import { prevPage, nextPage } from "../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { changePage } from "../redux/actions";
import { useEffect, useState } from "react";

function Paginate({ cantPage }) {
  const numPage = useSelector((state) => state.numPage);
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    setPage(numPage);
  }, [numPage]);

  const handleChange = (e) => {
    setPage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (page > 1 && page < cantPage) dispatch(changePage(page));
  };

  return (
    <footer className={styles.paginate}>
      <div className={styles.navigate} onClick={() => dispatch(prevPage())}>
        ⬅
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          className={styles.numPage}
          value={page}
          onChange={handleChange}
        />
      </form>
      <span> de {cantPage}</span>
      <span className={styles.navigate} onClick={() => dispatch(nextPage())}>
        ➡
      </span>
    </footer>
  );
}

export default Paginate;
