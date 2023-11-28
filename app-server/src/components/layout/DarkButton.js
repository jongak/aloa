const DarkButton = function ({
  isRev = false, //반전모드
  value, //값
  title, //내부들어갈것
}) {
  // 버튼 스타일을 결정하는 클래스 이름
  var buttonClassName = isRev ? "myDarkButton rev" : "myDarkButton ";

  return (
    <div
      className={buttonClassName}
      value={value}
      onClick={onclick}
      data-value={value}
    >
      {title}
    </div>
  );
};

export default DarkButton;
