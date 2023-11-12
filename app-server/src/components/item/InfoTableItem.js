import { useSelector } from "react-redux";

const InfoTableItem = function ({ element }) {
  const { id, cardTitle, cardValue, size } = element;
  return (
    <div className={`info_table_tr col-${size ? size : 2}`}>
      <div className="info_table_th">{cardTitle}</div>
      <div className="info_table_td">{cardValue ? cardValue : "-"}</div>
    </div>
  );
};

export default InfoTableItem;
