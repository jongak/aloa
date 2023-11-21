import { Link } from "react-router-dom";

function Footer() {
  const handleClick = () => {
    window.location.href = `mailto:${process.env.MY_EMAIL_ADDRESS}`;
  };
  return (
    <footer>
      <div className="container">
        <div className="col-lg-12">
          <p>
            Copyright © 2023 ALOATeams &nbsp;&nbsp;{" "}
            <Link onClick={handleClick}>문의하기</Link>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
