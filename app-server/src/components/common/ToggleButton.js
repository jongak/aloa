const ToggleButton = function ({ title, body, valueRef, setValueRef }) {
  return (
    <div className="myToggle">
      <div className="row">
        <div className={`toggleTitle ${valueRef ? "yes" : "no"}`}>{title}</div>
        <div className=""></div>
        <label className="switch ">
          <input
            type="checkbox"
            checked={valueRef}
            onChange={() => {
              setValueRef(!valueRef);
            }}
          />
          <span className="slider round"></span>
        </label>
      </div>
      <div className="row">
        <div className={`toggleBody ${valueRef ? "yes" : "no"} `}>{body}</div>
      </div>
    </div>
  );
};

export default ToggleButton;
