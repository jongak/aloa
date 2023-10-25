import { Link } from "react-router-dom";

const Button = function ({
  isRev = false,
  value,
  divStyle,
  href,
  style,
  onClick,
  title,
}) {
  if (isRev) {
    return (
      <div className="explore_list_button_rev" value={value} style={divStyle}>
        <Link
          to={href}
          style={style}
          data-value={value}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
        >
          {title}
        </Link>
      </div>
    );
  } else {
    return (
      <div className="explore_list_button" value={value} style={divStyle}>
        <Link
          to={href}
          style={style}
          data-value={value}
          onClick={(e) => {
            if (onClick) {
              onClick(e);
            }
          }}
        >
          {title}
        </Link>
      </div>
    );
  }
};
export default Button;
