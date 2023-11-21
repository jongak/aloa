import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setIsDark, setIsThemaOpen } from "../../store/mainSlice";
import ThemaToggle from "./ThemaToggle";
import DarkToggle from "./DarkToggle";
import { useState } from "react";

function Header({ setThema, thema }) {
  const dispatch = useDispatch();
  const isDark = useSelector((state) => state.mainSlice.isDark);
  const isThemaOpen = useSelector((state) => state.mainSlice.isThemaOpen);
  const [isMenu, setMenu] = useState();

  const menuToggle = () => {
    setMenu(!isMenu);
  };
  const closeMenu = () => {
    setMenu(false);
  };

  return (
    <>
      <header className="header-area">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <Link to="/" className="logo">
                  <img
                    className="logo_mark"
                    src={`/assets/images/logo/logo_mark_mycolor${thema}.png`}
                    alt=""
                  />
                  <img
                    className="logo_name logo_off"
                    src={`/assets/images/logo/logo_name_mycolor${thema}-hover.png`}
                    alt=""
                  />
                  <img
                    className="logo_hover logo_on"
                    src={`/assets/images/logo/logo_name_mycolor${thema}.png`}
                    alt=""
                  />
                </Link>
                <ul className="nav">
                  <li className="ripple">
                    <Link to="/">홈</Link>
                  </li>
                  <li className="ripple">
                    <Link to="/capture">카드 만들기</Link>
                  </li>
                  {/* <li className="ripple">
                    <Link to="/cards">카드확인</Link>
                  </li>
                  <li className="ripple">
                    <Link to="/aa">회원가입</Link>
                  </li> */}
                </ul>
                <Link className="menu-trigger" onClick={menuToggle}>
                  <span>Menu</span>
                </Link>

                <DarkToggle
                  valueRef={isDark}
                  setValueRef={(e) => {
                    dispatch(setIsDark({ newIsDark: e }));
                  }}
                  options={["light", "dark"]}
                />
                <div
                  className={`myThema ${
                    isThemaOpen ? "open" : "closed"
                  } a${thema}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    dispatch(setIsThemaOpen({ newIsThemaOpen: false }));
                  }}
                >
                  <div className="myThemaIn"></div>
                </div>
                <ThemaToggle
                  setValueRef={setThema}
                  options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                  colorToggle={true}
                  valueRef={thema}
                />
              </nav>
            </div>
          </div>
        </div>
      </header>
      <div>
        <div className={isMenu ? "menu" : "menu isMenu"}>
          <div className="menu_bg" onClick={closeMenu}></div>
          <ul className="nav_mobile">
            <li id="mobile_thema_color">
              <ThemaToggle
                setValueRef={setThema}
                options={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
                colorToggle={true}
                valueRef={thema}
              />
            </li>
            <li className="ripple">
              <Link to="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li className="ripple">
              <Link to="/capture" onClick={closeMenu}>
                capture
              </Link>
            </li>
            <li className="ripple">
              <Link to="/cards" onClick={closeMenu}>
                card
              </Link>
            </li>
            <li className="ripple">
              <Link to="/character/송도나봉선" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
            <li className="ripple">
              <Link to="#" onClick={closeMenu}>
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Header;
