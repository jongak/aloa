import React, { useState } from "react";

function ExpandableContent() {
  const [expanded, setExpanded] = useState(false);

  const toggleExpansion = () => {
    setExpanded(!expanded);
  };

  const content = expanded ? <div>{/* 확장된 내용 */}</div> : null;

  return (
    <div>
      <button onClick={toggleExpansion}>{expanded ? "축소" : "확장"}</button>
      {content}
    </div>
  );
}

export default ExpandableContent;
