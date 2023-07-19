import styles from '../styles/landing.module.css';
import {Link} from 'react-router-dom';
function Landing() {
  return (
    <div className={styles.landing}>
      <img className={styles.logo} src="https://1000marcas.net/wp-content/uploads/2020/01/Logo-Pokemon.png" alt="Logo Pokemon"  />
      <section className={styles.container}>
      <Link className={styles.link} to="/home">
        !A la aventura!
      </Link>
      </section>
    </div>
  );
}

export default Landing;
