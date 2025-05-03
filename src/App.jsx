import Navbar from './components/NavBar';
import Home from './pages/Home';
import './index.css';

function App() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />
      <Home />
    </div>
  );
}

export default App;
