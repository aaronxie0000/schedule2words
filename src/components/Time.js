import { useEffect, useState } from "react";
import Timeblock from "./Timeblock";

function Time({ timesSelected, updateTimeSelected }) {
  const [multiSelectOn, updateMultiSelect] = useState(false);

  useEffect(() => {
    document.getElementById("timeSec").onmousedown = () => {
      updateMultiSelect(true);
    };
  }, []);

  document.body.onmouseup = () => {
    updateMultiSelect(false);
  };

  document.body.onmouseleave = () => {
    updateMultiSelect(false);
  };

  const [typeCanMouseOver, updateCanMouseOver] = useState(false);

  return (
    <div>
      {Object.keys(timesSelected)
        .sort()
        .map((key, index) => (
          <Timeblock
            key={index}
            multiSelectOn={multiSelectOn}
            updateTimeSelected={updateTimeSelected}
            typeCanMouseOver={typeCanMouseOver}
            updateCanMouseOver={updateCanMouseOver}
            time={key}
            timesSelected={timesSelected}
          />
        ))}
    </div>
  );
}

export default Time;
