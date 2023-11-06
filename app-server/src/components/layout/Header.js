import { Link } from "react-router-dom";
import Toggle from "../common/Toggle";

function Header({ setThema }) {
  return (
    <header className="header-area header-sticky">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <nav className="main-nav">
              <Link to="/" className="logo">
                <img
                  src="/assets/images/logo2.png"
                  alt=""
                  style={{ width: "158px" }}
                />
              </Link>
              <ul className="nav">
                <li>
                  <Link to="/">Home</Link>
                </li>
                {/* <li>
                  <Link to="/shop">Our Shop</Link>
                </li>
                <li>
                  <Link to="/product-details">Product Details</Link>
                </li> */}
                <li>
                  <Link to="/capture">capture</Link>
                </li>
                <li>
                  <Link to="/make">만들기</Link>
                </li>
                <li>
                  <Link to="/character/송도나봉선">Contact Us</Link>
                </li>
                <li>
                  <Link to="#">Sign In</Link>
                </li>
              </ul>
              <Link className="menu-trigger">
                <span>Menu</span>
              </Link>

              <Toggle
                setValueRef={setThema}
                options={["light", "dark", "mygreen"]}
              />
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
