import { Link } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";

const Button = function ({
  isFixed = false, //모드에 관계없이 css적용
  isClickable = true,
  isRev = false, //반전모드
  toggleRef = null, //값
  defaltRefs = [], //버튼누르면 초기화할값
  defaltValues = [], //버튼누르면 초기화할값
  toggleChanged = null, //onClick끝나고 변경됨을알리는 값
  setToggleChanged = null, //onClick끝나고 변경됨을알리는 값
  value, //값
  divStyle, //겉 css
  href, //링크
  style, //Link css
  onClick,
  title, //내부들어갈것
  btnClass,
  download = false,
}) {
  // 버튼 스타일을 결정하는 클래스 이름
  var buttonClassName = isRev ? "my_button_rev" : "my_button";
  if (isFixed) {
    buttonClassName += " fixed";
  }
  if (!isClickable) {
    buttonClassName += " notClicked";
  }

  return (
    <div className={buttonClassName} value={value} style={divStyle}>
      <Link
        className="ripple"
        to={href}
        style={style}
        data-value={value}
        download={download}
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
