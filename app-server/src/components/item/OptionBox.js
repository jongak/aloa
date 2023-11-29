import OptionBoxItem from "./OptionBoxItem";

const OptionBox = function ({ elements }) {
  return (
    <div className="option_box">
      {elements.map((element) => (
        <OptionBoxItem key={element.id} element={element} />
      ))}
    </div>
  );
};

export default OptionBox;
