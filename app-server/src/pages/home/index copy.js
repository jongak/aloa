import { Link } from "react-router-dom";

function Home(){
  return(
    <>

    <div className="main-banner">
      <div className="container">
        <div className="row">
          <div className="col-lg-6 align-self-center">
            <div className="caption header-text">
              <h6>Welcome to lugx</h6>
              <h2>BEST GAMING SITE EVER!</h2>
              <p>LUGX Gaming is free Bootstrap 5 HTML CSS website template for your gaming websites. You can download and use this layout for commercial purposes. Please tell your friends about TemplateMo.</p>
              <div className="search-input">
                <form id="search" action="#">
                  <input type="text" placeholder="Type Something" id='searchText' name="searchKeyword" />
                  <button role="button">Search Now</button>
                </form>
              </div>
            </div>
          </div>
          <div className="col-lg-4 offset-lg-2">
            <div className="right-image">
              <img src="assets/images/banner-image.jpg" alt=""/>
              <span className="price">$22</span>
              <span className="offer">-40%</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="features">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-6">
            <Link to="#">
              <div className="item">
                <div className="image">
                  <img src="assets/images/featured-01.png" alt="" style={{maxWidth: '44px'}}/>
                </div>
                <h4>Free Storage</h4>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="#">
              <div className="item">
                <div className="image">
                  <img src="assets/images/featured-02.png" alt="" style={{maxWidth: '44px'}}/>
                </div>
                <h4>User More</h4>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="#">
              <div className="item">
                <div className="image">
                  <img src="assets/images/featured-03.png" alt="" style={{maxWidth: '44px'}}/>
                </div>
                <h4>Reply Ready</h4>
              </div>
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <Link to="#">
              <div className="item">
                <div className="image">
                  <img src="/assets/images/featured-04.png" alt="" style={{maxWidth: '44px'}}/>
                </div>
                <h4>Easy Layout</h4>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>

    <div className="section trending">
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
                <Link to="product-details.html"><img src="/assets/images/trending-01.jpg" alt=""/></Link>
                <span className="price"><em>$28</em>$20</span>
              </div>
              <div className="down-content">
                <span className="category">Action</span>
                <h4>Assasin Creed</h4>
                <Link to="product-details.html"><i className="fa fa-shopping-bag"></i></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item">
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/trending-02.jpg" alt=""/></Link>
                <span className="price">$44</span>
              </div>
              <div className="down-content">
                <span className="category">Action</span>
                <h4>Assasin Creed</h4>
                <Link to="product-details.html"><i className="fa fa-shopping-bag"></i></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item">
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/trending-03.jpg" alt=""/></Link>
                <span className="price"><em>$64</em>$44</span>
              </div>
              <div className="down-content">
                <span className="category">Action</span>
                <h4>Assasin Creed</h4>
                <Link to="product-details.html"><i className="fa fa-shopping-bag"></i></Link>
              </div>
            </div>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="item">
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/trending-04.jpg" alt=""/></Link>
                <span className="price">$32</span>
              </div>
              <div className="down-content">
                <span className="category">Action</span>
                <h4>Assasin Creed</h4>
                <Link to="product-details.html"><i className="fa fa-shopping-bag"></i></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="section most-played">
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
                <Link to="product-details.html"><img src="/assets/images/top-game-01.jpg" alt=""/></Link>
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
                <Link to="product-details.html"><img src="/assets/images/top-game-02.jpg" alt=""/></Link>
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
                <Link to="product-details.html"><img src="/assets/images/top-game-03.jpg" alt=""/></Link>
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
                <Link to="product-details.html"><img src="/assets/images/top-game-04.jpg" alt=""/></Link>
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
                <Link to="product-details.html"><img src="/assets/images/top-game-05.jpg" alt=""/></Link>
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
                <Link to="product-details.html"><img src="/assets/images/top-game-06.jpg" alt=""/></Link>
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
    </div>

    <div className="section categories">
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
                <Link to="product-details.html"><img src="/assets/images/categories-01.jpg" alt=""/></Link>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-6 col-xs-12">
            <div className="item">
              <h4>Action</h4>
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/categories-05.jpg" alt=""/></Link>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-6 col-xs-12">
            <div className="item">
              <h4>Action</h4>
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/categories-03.jpg" alt=""/></Link>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-6 col-xs-12">
            <div className="item">
              <h4>Action</h4>
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/categories-04.jpg" alt=""/></Link>
              </div>
            </div>
          </div>
          <div className="col-lg col-sm-6 col-xs-12">
            <div className="item">
              <h4>Action</h4>
              <div className="thumb">
                <Link to="product-details.html"><img src="/assets/images/categories-05.jpg" alt=""/></Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div className="section cta">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="shop">
              <div className="row">
                <div className="col-lg-12">
                  <div className="section-heading">
                    <h6>Our Shop</h6>
                    <h2>Go Pre-Order Buy & Get Best <em>Prices</em> For You!</h2>
                  </div>
                  <p>Lorem ipsum dolor consectetur adipiscing, sed do eiusmod tempor incididunt.</p>
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
                    <h2>Get Up To $100 Off Just Buy <em>Subscribe</em> Newsletter!</h2>
                  </div>
                  <div className="search-input">
                    <form id="subscribe" action="#">
                      <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Your email..."/>
                      <button type="submit">Subscribe Now</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>


  </>

  );
}

export default Home;