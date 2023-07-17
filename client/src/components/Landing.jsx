import styles from '../styles/landing.module.css';
import {Link} from 'react-router-dom';
function Landing() {
  return (
    <div className={styles.landing}>
      <Link className={styles.link} to="/home">
        !A la aventura!
      </Link>
    </div>
  );
}

export default Landing;
