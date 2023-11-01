const Toggle = function ({ setValueRef, options }) {
  const handleOnClickChange = (event) => {
    setValueRef(event.target.value);
  };

  const OptionsList = options.map((value, i) => {
    return (
      <input
        key={`toggle${value}`}
        type="button"
        value={value}
        data-value={value}
        onClick={handleOnClickChange}
      />
    );
  });
  return <div className="myToggleGroup">{OptionsList}</div>;
};

export default Toggle;
