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

import { Provider } from "react-redux";
import store from "./store/store";

import CharacterDetail from "./pages/characterDetail";
import Battle from "./pages/characterDetail/Battle";
import InternalStability from "./pages/characterDetail/InternalStability";
import Avatar from "./pages/characterDetail/Avatar";
import Statistics from "./pages/characterDetail/Statistics";
import Character from "./pages/characterDetail/Character";
import Guild from "./pages/characterDetail/Guild";
import Makecard from "./pages/make";
import FindName from "./pages/capture/FindName";
import SelectValue from "./pages/capture/SelectValue";
import ShareCard from "./pages/capture/ShareCard";
import SetOption from "./pages/capture/SetOption";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/product-details" element={<Product />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/search" element={<Search />} />
            <Route path="/capture" element={<Capture />}>
              <Route index element={<FindName />} />
              <Route path="select" element={<SelectValue />} />
              <Route path="set" element={<SetOption />} />
              <Route path="share" element={<ShareCard />} />
            </Route>
            <Route path="/make" element={<Makecard />} />
            <Route path="/character">
              <Route path=":id" element={<CharacterDetail />}>
                <Route index element={<Battle />} />
                <Route
                  path="internalStability"
                  element={<InternalStability />}
                />
                <Route path="avatar" element={<Avatar />} />
                <Route path="statistics" element={<Statistics />} />
                <Route path="character" element={<Character />} />
                <Route path="guild" element={<Guild />} />
              </Route>
            </Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
