import styles from '../styles/skeleton.module.css'

function Skeleton() {
  return (
    <div>
      <div className={styles.card}>
        <h1 className={`${styles.title} ${styles.loading}`}>&#160;</h1>
        <div
          className={`${styles.image} ${styles.loading}`}
        />
          <div className={styles.tipos}>
              <h3 className={`${styles.tipo} ${styles.loading}`}>&#160;</h3>
              <h3 className={`${styles.tipo} ${styles.loading}`}>&#160;</h3>
          </div>
      </div>
    </div>
  );
}

export default Skeleton;
