import { useSelector } from "react-redux";

const InfoTableItem = function ({ element }) {
  const { id, cardValue, size, cardImg } = element;
  return (
    <div className={`icons_table_tr mycol-${size ? size : 4}`}>
      <div>
        <img className={`mycol-18`} src={cardImg} />
      </div>
      <div className="icons_table_badge">{cardValue ? cardValue : "-"}</div>
    </div>
  );
};

export default InfoTableItem;
