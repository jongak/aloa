import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function Layout() {
  const [thema, setThema] = useState("1");
  const isDark = useSelector((state) => state.mainSlice.isDark);

  return (
    <div className={`App ${isDark} a${thema}`}>
      <Header setThema={setThema} thema={thema} />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
