// import logo from './logo.svg';
import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";
import Shop from "./pages/shop";
import Product from "./pages/product";
import Contact from "./pages/contact";
import Search from "./pages/search";
import Capture from "./pages/capture";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product-details" element={<Product />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/search" element={<Search />} />
          <Route path="/capture" element={<Capture />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
