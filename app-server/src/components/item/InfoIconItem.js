import { useSelector } from "react-redux";

const InfoTableItem = function ({ element }) {
  const { id, cardValue, size, cardImg } = element;
  return (
    <div className={`icons_table_tr col-${size ? size : 2}`}>
      <div>
        <img src={cardImg} />
      </div>
      <div className="icons_table_badge">{cardValue ? cardValue : "-"}</div>
    </div>
  );
};

export default InfoTableItem;
