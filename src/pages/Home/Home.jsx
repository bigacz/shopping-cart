import { Link } from 'react-router';
import './Home.module.css';

function Home() {
  return (
    <main>
      <h1>Kitchen Market</h1>
      <h2>Essentials for every kitchen</h2>
      <Link to="/shop">Shop now</Link>
    </main>
  );
}

export default Home;
