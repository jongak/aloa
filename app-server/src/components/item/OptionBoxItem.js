const equipQuality = function (qualityValue) {
  if (qualityValue == 100) return "orange";
  else if (qualityValue > 89) return "hotpink";
  else if (qualityValue > 69) return "blue";
  else if (qualityValue > 29) return "green";
  else if (qualityValue > 9) return "yellow";
  else return "red";
};

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

      {sprite ? (
        <div
          style={{
            backgroundColor: "#82786e",
            width: "60px",
            height: "8px",
            marginTop: "15px",
            marginLeft: "10px",
          }}
        >
          <div
            className="back_accessory_quality"
            style={{
              width: `${cardValue}%`,
              backgroundColor: `${equipQuality(cardValue)}`,
              height: "8px",
            }}
          ></div>
        </div>
      ) : (
        <div>{cardValue}</div>
      )}
    </div>
  );
};

export default OptionBoxItem;
