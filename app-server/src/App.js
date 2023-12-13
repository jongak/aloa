import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

import Capture from "./pages/capture";
import { Provider } from "react-redux";
import store from "./store/store";

import GetCard from "./pages/getCard";
import CardList from "./pages/cardList";
import AloaNotice from "./pages/notice";
import FindName from "./pages/capture/FindName";
import SelectValue from "./pages/capture/SelectValue";
import ShareCard from "./pages/capture/ShareCard";
import SetOption from "./pages/capture/SetOption";
import NotFound from "./pages/notFound";
import axios from "axios";
import Login from "./pages/login";
import SignUp from "./pages/signup";
import Current from "./pages/getCard/Current";
import History from "./pages/getCard/History";
import NoticeBoard from "./pages/notice/NoticeBoard";
import NoticeList from "./pages/notice/NoticeList";

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
            <Route path="/notice" element={<AloaNotice />}>
              <Route index element={<NoticeList />} />
              <Route path="setting" element={<NoticeBoard />} />
            </Route>
            <Route path="/list" element={<CardList />} />
            <Route path="/cards/:id" element={<GetCard />}>
              <Route index element={<Current />} />
              <Route path="history" element={<History />} />
            </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
