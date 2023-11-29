const InfoTableItem = function ({ element }) {
  const { id, cardValue, size, cardImg, iconSize, margin, spanRight } = element;
  return (
    <div className={`icons_table_tr mycol-${size ? size : 4}`}>
      <div>
        <img
          className={`mycol-${iconSize ? iconSize : 18} ${
            margin ? margin : ""
          }`}
          src={cardImg}
        />
      </div>
      <div
        className={`icons_table_badge ${spanRight ? "right" + spanRight : ""}`}
      >
        {cardValue ? cardValue : "-"}
      </div>
    </div>
  );
};

export default InfoTableItem;
