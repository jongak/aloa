import { useDispatch, useSelector } from "react-redux";
import {
  setIsGlow,
  setIsHolo,
  setIsLevel,
  setIsName,
  setIsShadow,
  setIsShine,
  setIsTitle,
  setRarityPreset,
} from "../../store/captureSlice";
import { useContext, useEffect } from "react";
import AccordionContext from "react-bootstrap/AccordionContext";
import { useAccordionButton } from "react-bootstrap/AccordionButton";

const ToggleButton = function ({
  title,
  body,
  titleRef,
  eventKey,
  isChanged,
  setIsChanged,
}) {
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
  } else if (titleRef == "isHolo") {
    valueRef = useSelector((state) => state.captureSlice.isHolo);
  } else if (titleRef == "isGlow") {
    valueRef = useSelector((state) => state.captureSlice.isGlow);
  } else if (titleRef == "isShine") {
    valueRef = useSelector((state) => state.captureSlice.isShine);
  } else if (titleRef == "isShadow") {
    valueRef = useSelector((state) => state.captureSlice.isShadow);
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
    } else if (titleRef == "custom") {
      dispatch(
        setIsHolo({
          newIsHolo: true,
        })
      );
      dispatch(
        setIsGlow({
          newIsGlow: true,
        })
      );
      dispatch(
        setIsShine({
          newIsShine: true,
        })
      );
      dispatch(
        setIsShadow({
          newIsShadow: true,
        })
      );
    } else if (["legendary", "holographic"].includes(titleRef)) {
      dispatch(
        setIsHolo({
          newIsHolo: false,
        })
      );
      dispatch(
        setIsGlow({
          newIsGlow: false,
        })
      );
      dispatch(
        setIsShine({
          newIsShine: false,
        })
      );
      dispatch(
        setIsShadow({
          newIsShadow: false,
        })
      );
    } else if (titleRef == "isHolo") {
      dispatch(
        setIsHolo({
          newIsHolo: item,
        })
      );
    } else if (titleRef == "isGlow") {
      if (item) {
        dispatch(
          setIsHolo({
            newIsHolo: true,
          })
        );
      }
      dispatch(
        setIsGlow({
          newIsGlow: item,
        })
      );
    } else if (titleRef == "isShine") {
      dispatch(
        setIsShine({
          newIsShine: item,
        })
      );
    } else if (titleRef == "isShadow") {
      dispatch(
        setIsShadow({
          newIsShadow: item,
        })
      );
    }
    setIsChanged(!isChanged);
  };

  return (
    <div
      className="myToggle"
      onClick={(e) => {
        e.preventDefault();
        setValueRef(!valueRef);
      }}
    >
      <div className={`toggleTitle ${valueRef ? "yes" : "no"}`}>{title}</div>
      <label className="switch">
        <input type="checkbox" checked={valueRef} onChange={() => {}} />
        <span className="slider round"></span>
      </label>

      <div className={`toggleBody ${valueRef ? "yes" : "no"} `}>{body}</div>
    </div>
  );
};

export default ToggleButton;
