const ColorToggle = function ({ optionColors, isChanged, setIsChanged }) {
  const handleBlurChange = (event) => {
    var newOptionColors = optionColors.current;
    newOptionColors[event.target.dataset.index] = event.target.value;
    optionColors.current = newOptionColors;
    setIsChanged(!isChanged);
  };

  const OptionsList = optionColors.current.map((color, i) => {
    return (
      <input
        key={`color${i + 1}`}
        type="color"
        defaultValue={color}
        data-index={i}
        onBlur={handleBlurChange}
      />
    );
  });
  return <>{OptionsList}</>;
};

export default ColorToggle;
