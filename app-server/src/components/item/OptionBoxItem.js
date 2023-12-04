const OptionBoxItem = function ({ element }) {
  const { cardImg, cardValue, gridTwo } = element;
  return (
    <div
      className={`option_item${gridTwo ? " gridTwo" : ""}${
        cardImg ? " icon" : ""
      }`}
    >
      {cardImg ? <img src={cardImg} /> : <></>}
      <div>{cardValue}</div>
    </div>
  );
};

export default OptionBoxItem;
