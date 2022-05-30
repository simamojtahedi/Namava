import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Providers from './context/Providers';

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
            <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
