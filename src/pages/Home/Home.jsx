import { Link } from 'react-router';
import styles from './Home.module.css';

function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>Kitchen Market</h1>
        <h2>Essentials for every kitchen</h2>
        <Link className={styles.link} to="/shop">
          Shop now
        </Link>
      </div>
    </main>
  );
}

export default Home;
