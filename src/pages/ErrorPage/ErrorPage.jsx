import './ErrorPage.module.css';
import { Link, useRouteError } from 'react-router';

function ErrorPage() {
  const error = useRouteError();

  return (
    <div>
      {error?.status == 404 ? (
        <>
          <h2>404 Error</h2>
          <p>This page doesn't exist</p>
        </>
      ) : (
        <>
          <h2>Unexpected error</h2>
          <p>Something went wrong</p>
        </>
      )}
      <Link to={'/'}>Go home</Link>
    </div>
  );
}

export default ErrorPage;
