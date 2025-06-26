import './ErrorPage.module.css';
import { Link } from 'react-router';

function ErrorPage() {
  return (
    <div>
      <h2>404 Error</h2>
      <p>This page doesn't exist</p>
      <Link to={'/'}>Go home</Link>
    </div>
  );
}

export default ErrorPage;
