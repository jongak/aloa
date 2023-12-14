const InfoTableItem = function ({ element }) {
  const { id, cardValue, size, cardImg, margin, spanRight, sprite } = element;
  return (
    <div className={`icons_table_tr mycol-${size ? size : 4}`}>
      <div className="icon_img_cover">
        <div
          className={`
            icon_img
            ${margin ? margin : ""} 
            ${sprite ? sprite : ""}
          `}
          style={{ backgroundImage: `url(${cardImg})` }}
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
