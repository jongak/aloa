const OptionBoxItem = function ({ element }) {
  const { cardImg, cardValue, gridTwo, sprite } = element;
  return (
    <div
      className={`option_item${gridTwo ? " gridTwo" : ""}${
        cardImg ? " icon" : ""
      }`}
    >
      {cardImg ? (
        <div className="icon_img_cover">
          <div
            className={`
            icon_img
            ${sprite ? sprite : ""}
          `}
            style={{ backgroundImage: `url(${cardImg})` }}
          />
        </div>
      ) : (
        <></>
      )}
      <div>{cardValue}</div>
    </div>
  );
};

export default OptionBoxItem;
