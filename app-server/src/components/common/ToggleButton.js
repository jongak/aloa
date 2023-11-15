import { useDispatch, useSelector } from "react-redux";
import {
  setIsLevel,
  setIsName,
  setIsTitle,
  setRarityPreset,
} from "../../store/captureSlice";
import { useContext, useEffect } from "react";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const ToggleButton = function ({ title, body, titleRef }) {
  const { activeEventKey } = useContext(AccordionContext);
  const rarityPreset = useSelector((state) => state.captureSlice.rarityPreset);
  const dispatch = useDispatch();
  var valueRef = true;
  if (titleRef == "isName") {
    valueRef = useSelector((state) => state.captureSlice.isName);
  } else if (titleRef == "isTitle") {
    valueRef = useSelector((state) => state.captureSlice.isTitle);
  } else if (titleRef == "isLevel") {
    valueRef = useSelector((state) => state.captureSlice.isLevel);
  } else if (["custom", "legendary", "holographic"].includes(titleRef)) {
    valueRef = rarityPreset == titleRef;
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
    } else if (["custom", "legendary", "holographic"].includes(titleRef)) {
      dispatch(
        setRarityPreset({
          newRarityPreset: titleRef,
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
