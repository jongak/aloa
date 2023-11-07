import { useState } from "react";
import DarkButton from "./DarkButton";

const DarkToggle = function (props) {
  const { setValueRef, options, valueRef } = props;
  const handleOnClickChange = () => {
    setToggleValue(!toggleValue);
    if (toggleValue) {
      setValueRef("light");
    } else {
      setValueRef("dark");
    }
  };
  const [toggleValue, setToggleValue] = useState(true);

  const OptionsList = options.map((value, i) => {
    return (
      <DarkButton
        isFixed={false}
        isRev={value != valueRef}
        value={value}
        title={
          <i className={`fas fa-${value == "light" ? "sun" : "moon"}`}></i>
        }
        key={`toggle${value}`}
      />
    );
  });
  return (
    <div onClick={handleOnClickChange} className="myDarkToggle">
      {OptionsList}
    </div>
  );
};

export default DarkToggle;
