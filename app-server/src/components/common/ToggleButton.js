const ToggleButton = function ({ title, body, valueRef, setValueRef }) {
  return (
    <div className="myToggle">
      <div className={`toggleTitle ${valueRef ? "yes" : "no"}`}>{title}</div>
      <label className="switch">
        <input
          type="checkbox"
          checked={valueRef}
          onChange={() => {
            setValueRef(!valueRef);
          }}
        />
        <span className="slider round"></span>
      </label>

      <div className={`toggleBody ${valueRef ? "yes" : "no"} `}>{body}</div>
    </div>
  );
};

export default ToggleButton;
