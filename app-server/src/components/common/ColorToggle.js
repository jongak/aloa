import { useSelector } from "react-redux";

const ColorToggle = function ({
  optionColors,
  isChanged,
  setIsChanged,
  titleRef,
}) {
  var isShow = true;
  if (titleRef == "isHolo") {
    isShow = useSelector((state) => state.captureSlice.isHolo);
  } else if (titleRef == "isGlow") {
    isShow = useSelector((state) => state.captureSlice.isGlow);
  } else if (titleRef == "isShine") {
    isShow = useSelector((state) => state.captureSlice.isShine);
  } else if (titleRef == "isShadow") {
    isShow = useSelector((state) => state.captureSlice.isShadow);
  }

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
  return (
    <div className={`ColorCover ${isShow ? "show" : ""}`}>{OptionsList}</div>
  );
};

export default ColorToggle;
