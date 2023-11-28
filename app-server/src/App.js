import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

import Capture from "./pages/capture";
import { Provider } from "react-redux";
import store from "./store/store";

import GetCard from "./pages/getCard";
import FindName from "./pages/capture/FindName";
import SelectValue from "./pages/capture/SelectValue";
import ShareCard from "./pages/capture/ShareCard";
import SetOption from "./pages/capture/SetOption";
import NotFound from "./pages/notFound";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/capture" element={<Capture />}>
              <Route index element={<FindName />} />
              <Route path="select" element={<SelectValue />} />
              <Route path="set" element={<SetOption />} />
              <Route path="share" element={<ShareCard />} />
            </Route>
            <Route path="/cards/:id" element={<GetCard />} />
            <Route path="/*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
