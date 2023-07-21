import styles from "../styles/options.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards } from "../redux/actions";

function Options() {
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  function handleOrder(e) {
    dispatch(orderCards(e.target.value));
  }

  function handleFilter(e) {
    dispatch(filterCards(e.target.value));
  }

  return (
    <div className={styles.options}>
      <select
        className={styles.select}
        name="order"
        id="order"
        onChange={handleOrder}
      >
        <option value="default">Ordenar: </option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
      </select>
      <select
        className={styles.select}
        name="types"
        id="types"
        onChange={handleFilter}
      >
        <option value="all">Origen: </option>
        <option value="api">Api</option>
        <option value="db">Base de Datos</option>
      </select>
      <select
        className={styles.select}
        name="origin"
        id="origin"
        onChange={handleFilter}
      >
        <option value="all">Tipo: </option>
        {types &&
          types.map((type) => (
            <option key={type.id} value={type.nombre}>
              {type.nombre}
            </option>
          ))}
      </select>
    </div>
  );
}

export default Options;
