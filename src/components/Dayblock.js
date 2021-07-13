import { useState } from "react";
import Timeblock from "./Timeblock";

function DayBlock({ multiSelectOn }) {
  const [timesSelected, updateTimeSelected] = useState({
    1500: false,
    1530: false,
    1600: false,
    1630: false,
    1700: false,
  });

  return (
    <>
      <Timeblock
        timesSelected={timesSelected}
        updateTimeSelected={updateTimeSelected}
        multiSelectOn={multiSelectOn}
      />
    </>
  );
}

export default DayBlock;
