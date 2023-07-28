import styles from "../styles/options.module.css";
import { useDispatch, useSelector } from "react-redux";
import { filterCards, orderCards, resetPokemons } from "../redux/actions";
import { useState } from "react";

function Options() {
  const [selectValues, setSelectValues] = useState({
    order: "",
    origin: "",
    types: ""
  });
  const types = useSelector((state) => state.types);
  const dispatch = useDispatch();

  function handleOrder(e) {
    setSelectValues({
      ...selectValues,
      [e.target.name]: e.target.value,
    });
    dispatch(orderCards(e.target.value));
  }

  function handleFilter(e) {
    setSelectValues({
      ...selectValues,
      [e.target.name]: e.target.value,
    });
    dispatch(
      filterCards({
        ...selectValues,
        [e.target.name]: e.target.value,
      })
    );
  }
  const handleReset = (e) => {
    e.preventDefault();
    dispatch(resetPokemons());
    setSelectValues({
      order: "",
      origin: "",
      types: ""
    });
  };

  return (
    <div className={styles.options}>
      <select
        className={styles.select}
        name="order"
        id="order"
        onChange={handleOrder}
        value={selectValues.order}
      >
        <option value="">Ordenar: </option>
        <option value="asc">Ascendente</option>
        <option value="desc">Descendente</option>
        <option value="maAttack">Mayor Ataque</option>
        <option value="miAttack">Menor Ataque</option>
      </select>
      <button className={styles.submit} onClick={handleReset}>
        Resetear
      </button>
      <select
        className={styles.select}
        name="origin"
        id="origin"
        onChange={handleFilter}
        value={selectValues.origin}
      >
        <option value="">Origen: </option>
        <option value="api">Api</option>
        <option value="db">Base de Datos</option>
      </select>
      <select
        className={styles.select}
        name="types"
        id="types"
        onChange={handleFilter}
        value={selectValues.types}
      >
        <option value="">Tipo: </option>
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
