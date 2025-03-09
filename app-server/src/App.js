import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout";
import Home from "./pages/home";

import Capture from "./pages/capture";
import { Provider } from "react-redux";
import store from "./store/store";

import GetCard from "./pages/getCard";
import CardList from "./pages/cardList";
// import AloaNotice from "./pages/notice";
import NoticeBoard from "./pages/notice/NoticeBoard";
import NoticeList from "./pages/notice";
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

import AdminList from "./pages/adminList";
import { Helmet } from "react-helmet-async";

axios.defaults.baseURL = process.env.REACT_APP_API_SERVER;

function App() {
  return (
    <>
      <Helmet>
        <title>로아 카드인장 - ALOA.KR</title>
        <meta
          name="description"
          content="인장을 카드로 꾸며보자! ALOA 입니다."
        />
        <meta
          name="keywords"
          content="로스트아크,로아,카드인장,인장,aloa,인벤,로벤"
        />
        <meta property="og:title" content="로아 카드인장 생성기 - ALOA.KR" />
        <meta
          property="og:description"
          content="로스트아크 캐릭터 정보를 카드처럼 만들어주는 카드인장 생성사이트입니다."
        />
        <meta
          property="og:image"
          content="https://aloa.kr/assets/images/logo/logo_mark_light.png"
        />
        <link rel="canonical" href="https://aloa.kr" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="로아 카드인장 생성기 - ALOA.KR" />
        <meta
          name="twitter:description"
          content="로스트아크 캐릭터 정보를 카드처럼 만들어주는 카드인장 생성사이트입니다."
        />
        <meta
          name="twitter:image"
          content="https://aloa.kr/assets/images/logo/logo_mark_light.png"
        />
      </Helmet>
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
              <Route path="/notice" element={<NoticeList />}>
                <Route path="setting" element={<NoticeBoard />} />
              </Route>
              <Route path="/list" element={<CardList />} />
              <Route path="/cards/:id" element={<GetCard />}>
                <Route index element={<Current />} />
                <Route path="history" element={<History />} />
              </Route>
              <Route path="/adminlist/:no" element={<AdminList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/*" element={<NotFound />}></Route>
            </Route>
          </Routes>
        </Router>
      </Provider>
    </>
  );
}

export default App;
