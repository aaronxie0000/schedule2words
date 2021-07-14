import { useState } from "react";
import Blocks from "./Blocks";

function Timeblock({ timesSelected, updateTimeSelected }) {
  const [multiSelectOn, updateMultiSelect] = useState(false);

  document.body.onmousedown = () => {
    updateMultiSelect(true);
  };

  document.body.onmouseup = () => {
    updateMultiSelect(false);
  };

  const [typeCanMouseOver, updateCanMouseOver] = useState(false);

  return (
    <div>
      {Object.keys(timesSelected)
        .sort()
        .map((key, index) => (
          <Blocks
            key={index}
            multiSelectOn={multiSelectOn}
            updateTimeSelected={updateTimeSelected}
            typeCanMouseOver={typeCanMouseOver}
            updateCanMouseOver={updateCanMouseOver}
            time={key}
          />
        ))}
    </div>
  );
}

export default Timeblock;
