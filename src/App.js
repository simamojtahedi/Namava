import './App.css';
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Providers from './context/Providers';
import SinglePage from './pages/SinglePage';
import Navbar from './components/navbar/Navbar';
import List from './pages/List';
import Search from './pages/Search';
import Collections from './pages/Collections';
import "swiper/css/pagination";
import "swiper/css";
import ActorPage from './pages/ActorPage';

function App() {
  return (
    <Providers>
      <Router>
        <Navbar />
        <Routes>
            <Route path={'/:type/:id'} element={<SinglePage />} />
            <Route path="/list" element={ <List />} />
            <Route path="/search" element={<Search />} />
            <Route path="/search" element={<Search />} />
            <Route path="/collection-:id" element={<Collections />} />
            <Route path="/person-:id" element={<ActorPage />} />
            <Route path="/" exact element={ <Home />} />
        </Routes>
      </Router>
    </Providers>
  );
}

export default App;
