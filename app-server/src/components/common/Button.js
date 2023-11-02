import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Button = function ({
  isRev = false,
  toggleRef = null,
  defaltRefs = [],
  defaltValues = [],
  toggleChanged = null,
  setToggleChanged = null,
  value,
  divStyle,
  href,
  style,
  onClick,
  title,
}) {
  // 버튼 스타일을 결정하는 클래스 이름
  const buttonClassName = isRev ? "my_button_rev" : "my_button";

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
          if (toggleRef) {
            toggleRef.current = !toggleRef.current;
            defaltRefs.forEach((defaltRef, i) => {
              defaltRef.current = defaltValues[i];
            });
            setToggleChanged(!toggleChanged);
          }
        }}
      >
        {title}
      </Link>
    </div>
  );
};

export default Button;
