import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Providers from './context/Providers';
import SinglePage from './pages/SinglePage';

function App() {
  return (
    <Providers>
      <Router>
        <Routes>
            <Route path={'/:type/:id'} element={<SinglePage />} />
            <Route path="/" exact element={<Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
