import Navbar from 'components/Navbar/Navbar';
import { Outlet } from 'react-router';

function App() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
