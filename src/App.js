import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Providers from './context/Providers';
import SinglePage from './pages/SinglePage';
import Navbar from './components/navbar/Navbar';
import List from './pages/List';
import Search from './pages/Search';

function App() {
  return (
    <Providers>
      <Router>
        <Navbar />
        <Routes>
            <Route path={'/:type/:id'} element={<SinglePage />} />
            <Route path="/list" element={ <List />} />
            <Route path="/search" element={<Search />} />
            <Route path="/" exact element={ <Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
