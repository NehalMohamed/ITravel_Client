import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import MinimalLayout from './layouts/MinimalLayout';
import Home from './pages/HomePage';
import Wishlist from './pages/WishlistPage';
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/main.scss";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          {/* Routes with navbar and footer */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/Wishlist" element={<Wishlist />} />
            {/* <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} /> */}
          </Route>

          {/* Routes without navbar and footer */}
          <Route element={<MinimalLayout />}>
            {/* <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} /> */}
          </Route>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
