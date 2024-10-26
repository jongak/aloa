import { useDispatch, useSelector } from "react-redux";
import { setThema } from "../../store/mainSlice";

const ThemaToggle = function (props) {
  const { options } = props;
  const isThemaOpen = useSelector((state) => state.mainSlice.isThemaOpen);
  const thema = useSelector((state) => state.mainSlice.thema);
  const dispatch = useDispatch();

  const handleOnClickChange = (event) => {
    dispatch(setThema({ newThema: event.target.dataset.value }));
  };

  const OptionsList = options.map((value, i) => {
    return (
      <div
        className={`myThemaButton ${value == thema ? "clicked" : ""}`}
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
