import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setIsThemaOpen } from "../../store/mainSlice";

function Layout() {
  const [thema, setThema] = useState("1");
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const dispatch = useDispatch();
  return (
    <div
      className={`App ${isDark} a${thema}`}
      onClick={() => {
        dispatch(setIsThemaOpen({ newIsThemaOpen: true }));
      }}
    >
      <Header setThema={setThema} thema={thema} />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
