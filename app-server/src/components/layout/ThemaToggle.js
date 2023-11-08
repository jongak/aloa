import { useDispatch, useSelector } from "react-redux";
import { setIsThemaOpen } from "../../store/mainSlice";

const ThemaToggle = function (props) {
  const { setValueRef, options, valueRef } = props;
  const isThemaOpen = useSelector((state) => state.mainSlice.isThemaOpen);

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
  return (
    <div className={`myThemaToggle ${isThemaOpen ? "closed" : "open"}`}>
      {OptionsList}
    </div>
  );
};

export default ThemaToggle;
