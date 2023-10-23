import { Link } from "react-router-dom";

const Shop = function (){
  return(
    <>
      <div className="page-heading header-text">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <h3>Our Shop</h3>
              <span className="breadcrumb"><Link to="#">Home</Link> &#62; Our Shop</span>
            </div>
          </div>
        </div>
      </div>

      <div className="section trending">
        <div className="container">
          <ul className="trending-filter">
            <li>
              <Link className="is_active" to="#!" data-filter="*">Show All</Link>
            </li>
            <li>
              <Link to="#!" data-filter=".adv">Adventure</Link>
            </li>
            <li>
              <Link to="#!" data-filter=".str">Strategy</Link>
            </li>
            <li>
              <Link to="#!" data-filter=".rac">Racing</Link>
            </li>
          </ul>
          <div className="row trending-box">
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-01.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$36</em>$24</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-02.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$32</em>$22</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv rac"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-03.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$45</em>$30</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-04.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$32</em>$22</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-03.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$38</em>$26</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac adv"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-01.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$30</em>$20</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-04.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$32</em>$22</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 rac adv"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-02.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$32</em>$22</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv rac"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-03.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$28</em>$20</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-04.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$26</em>$18</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 adv"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-01.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$32</em>$24</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
            <div
              className="col-lg-3 col-md-6 align-self-center mb-30 trending-items col-md-6 str"
            >
              <div className="item">
                <div className="thumb">
                  <Link to="product-details.html"
                    ><img src="assets/images/trending-02.jpg" alt=""
                  /></Link>
                  <span className="price"><em>$45</em>$30</span>
                </div>
                <div className="down-content">
                  <span className="category">Action</span>
                  <h4>Assasin Creed</h4>
                  <Link to="product-details.html"
                    ><i className="fa fa-shopping-bag"></i
                  ></Link>
                </div>
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12">
              <ul className="pagination">
                <li><Link to="#"> &lt; </Link></li>
                <li><Link to="#">1</Link></li>
                <li><Link className="is_active" to="#">2</Link></li>
                <li><Link to="#">3</Link></li>
                <li><Link to="#"> &gt; </Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}

export default Shop;