import { useDispatch, useSelector } from "react-redux";
import { setIsLevel, setIsName, setIsTitle } from "../../store/captureSlice";

const ToggleButton = function ({ title, body, titleRef }) {
  const dispatch = useDispatch();
  var valueRef = true;
  if (titleRef == "isName") {
    valueRef = useSelector((state) => state.captureSlice.isName);
  } else if (titleRef == "isTitle") {
    valueRef = useSelector((state) => state.captureSlice.isTitle);
  } else if (titleRef == "isLevel") {
    valueRef = useSelector((state) => state.captureSlice.isLevel);
  }

  const setValueRef = function (item) {
    if (titleRef == "isName") {
      dispatch(
        setIsName({
          newIsName: item,
        })
      );
    } else if (titleRef == "isTitle") {
      dispatch(
        setIsTitle({
          newIsTitle: item,
        })
      );
    } else if (titleRef == "isLevel") {
      dispatch(
        setIsLevel({
          newIsLevel: item,
        })
      );
    }
  };

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
