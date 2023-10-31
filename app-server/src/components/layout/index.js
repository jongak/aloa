import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";

function Layout() {
  const [thema, setThema] = useState("dark");

  return (
    <div className={`App ${thema}`}>
      <Header setThema={setThema} />

      <Outlet />

      <Footer />
    </div>
  );
}

export default Layout;
