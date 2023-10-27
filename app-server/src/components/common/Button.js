import { Link } from "react-router-dom";
import "./Button.css";
import { useState } from "react";
import { useSelector } from "react-redux";

const Button = function ({
  isRev = false,
  toggle,
  value,
  divStyle,
  href,
  style,
  onClick,
  title,
}) {
  // 버튼 스타일을 결정하는 클래스 이름
  const buttonClassName = isRev
    ? "explore_list_button_rev"
    : "explore_list_button";

  return (
    <div className={buttonClassName} value={value} style={divStyle}>
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
};

export default Button;
