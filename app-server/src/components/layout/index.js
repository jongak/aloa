import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Layout() {
  const [isDark, setIsDark] = useState("dark");
  const [thema, setThema] = useState("1");

  return (
    <div className={`App ${isDark} a${thema}`}>
      <Header setThema={setThema} setIsDark={setIsDark} />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
