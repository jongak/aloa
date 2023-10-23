import { Link } from "react-router-dom";
import "./holofoil.css";

function Home() {
  return (
    <>
      <div className="main-banner">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 align-self-center">
              <div className="caption header-text">
                <img src="/assets/images/logo2.png" />
                {/* <h6>aLoa에 오신 것을 환영합니다</h6>
                <h2>
                  로아를 더욱 편하게
                  <br /> 이용하세요!
                </h2> */}

                <div className="search-input">
                  <form id="search" action="#">
                    <input
                      type="text"
                      placeholder="Type Something"
                      id="searchText"
                      name="searchKeyword"
                    />
                    <button role="button">Search Now</button>
                  </form>
                </div>
              </div>
            </div>

            <div className="features" style={{ margin: 0 }}>
              <div className="container">
                <div className="row">
                  <div className="col-lg-3 col-md-6">
                    <Link to="#">
                      <div className="item">
                        <div className="image">
                          <img
                            src="/assets/images/featured-04.png"
                            alt=""
                            style={{ maxWidth: "44px" }}
                          />
                        </div>
                        <h4>나만의 로아카드를 만들어보세요</h4>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-lg-4 offset-lg-2">
              <div className="right-image">
                <img src="/assets/images/card_example.png" alt="" />
                {/* <span className="price">$22</span>
                <span className="offer">-40%</span> */}
              </div>
            </div>

            <div
              className="card dragon / masked"
              data-number="49"
              data-set="pgo"
              data-subtypes="vmax single strike"
              data-supertype="pokémon"
              data-rarity="rare rainbow alt"
              data-trainer-gallery="false"
              style={{
                "--pointer-x": "50%",
                "--pointer-y": "50%",
                "--pointer-from-center": 0,
                "--pointer-from-top": "0.5",
                "--pointer-from-left": "0.5",
                "--card-opacity": 0,
                "--rotate-x": "0deg",
                "--rotate-y": "0deg",
                "--background-x": "50%",
                "--background-y": "50%",
                "--card-scale": "1",
                "--translate-x": "0px",
                "--translate-y": "0px",
              }}
            >
              <div className="card__translater">
                <button
                  className="card__rotator"
                  aria-label="Expand the Pokemon Card; Dragonite V."
                  tabIndex="0"
                >
                  {/* <img
                    className="card__back"
                    src="https://tcg.pokemon.com/assets/img/global/tcg-card-back-2x.jpg"
                    alt="The back of a Pokemon Card, a Pokeball in the center with Pokemon logo above and below"
                    loading="lazy"
                    width="660"
                    height="921"
                  />{" "} */}
                  <div className="card__front">
                    <img
                      // src="https://images.pokemontcg.io/pgo/49_hires.png"
                      src="/assets/images/card_example.png"
                      alt="Front design of the Dragonite V Pokemon Card, with the stats and info around the edge"
                      loading="lazy"
                      width="660"
                      height="921"
                    />{" "}
                    <div className="card__shine"></div>{" "}
                    <div className="card__glare"></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div className="section trending">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h6>Trending</h6>
                <h2>Trending Games</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="main-button">
                <Link to="shop.html">View All</Link>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/trending-01.jpg" alt="" />
                  </Link>
                  <span className="price">
                    <em>$28</em>$20
                  </span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">
                    <i className="fa fa-shopping-bag"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/trending-02.jpg" alt="" />
                  </Link>
                  <span className="price">$44</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">
                    <i className="fa fa-shopping-bag"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/trending-03.jpg" alt="" />
                  </Link>
                  <span className="price">
                    <em>$64</em>$44
                  </span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">
                    <i className="fa fa-shopping-bag"></i>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-md-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/trending-04.jpg" alt="" />
                  </Link>
                  <span className="price">$32</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">
                    <i className="fa fa-shopping-bag"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="section most-played">
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div className="section-heading">
                <h6>TOP GAMES</h6>
                <h2>Most Played</h2>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="main-button">
                <Link to="shop.html">View All</Link>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-01.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-02.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-03.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-04.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-05.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-md-6 col-sm-6">
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/top-game-06.jpg" alt="" />
                  </Link>
                </div>
                <div className="down-content">
                  <span className="category">Adventure</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html">Explore</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="section categories">
        <div className="container">
          <div className="row">
            <div className="col-lg-12 text-center">
              <div className="section-heading">
                <h6>Categories</h6>
                <h2>Top Categories</h2>
              </div>
            </div>
            <div className="col-lg col-sm-6 col-xs-12">
              <div className="item">
                <h4>Action</h4>
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/categories-01.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg col-sm-6 col-xs-12">
              <div className="item">
                <h4>Action</h4>
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/categories-05.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg col-sm-6 col-xs-12">
              <div className="item">
                <h4>Action</h4>
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/categories-03.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg col-sm-6 col-xs-12">
              <div className="item">
                <h4>Action</h4>
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/categories-04.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-lg col-sm-6 col-xs-12">
              <div className="item">
                <h4>Action</h4>
                <div className="thumb">
                  <Link to="product-details.html">
                    <img src="/assets/images/categories-05.jpg" alt="" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="section cta">
        <div className="container">
          <div className="row">
            <div className="col-lg-5">
              <div className="shop">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading">
                      <h6>Our Shop</h6>
                      <h2>
                        Go Pre-Order Buy & Get Best <em>Prices</em> For You!
                      </h2>
                    </div>
                    <p>
                      Lorem ipsum dolor consectetur adipiscing, sed do eiusmod
                      tempor incididunt.
                    </p>
                    <div className="main-button">
                      <Link to="shop.html">Shop Now</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-5 offset-lg-2 align-self-end">
              <div className="subscribe">
                <div className="row">
                  <div className="col-lg-12">
                    <div className="section-heading">
                      <h6>NEWSLETTER</h6>
                      <h2>
                        Get Up To $100 Off Just Buy <em>Subscribe</em>{" "}
                        Newsletter!
                      </h2>
                    </div>
                    <div className="search-input">
                      <form id="subscribe" action="#">
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          placeholder="Your email..."
                        />
                        <button type="submit">Subscribe Now</button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> */}
    </>
  );
}

export default Home;
