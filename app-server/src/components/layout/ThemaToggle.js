const ThemaToggle = function (props) {
  const { setValueRef, options, valueRef } = props;
  const handleOnClickChange = (event) => {
    setValueRef(event.target.dataset.value);
  };

  const OptionsList = options.map((value, i) => {
    return (
      <div
        className={`myThemaButton ${value == valueRef ? "clicked" : ""}`}
        id={`color${value}`}
        key={`button${value}`}
        data-value={value}
        onClick={handleOnClickChange}
      />
    );
  });
  return <div className="myThemaToggle">{OptionsList}</div>;
};

export default ThemaToggle;
