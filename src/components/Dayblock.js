import { useState } from "react";
import Timeblock from "./Timeblock";

function DayBlock() {
  // times are start time, eg. 2130 is true means free from 2130 to 2200 (+30min)
  const [timesSelected, updateTimeSelected] = useState({
    '0800': false,
    '0830': false,
    '0900': false,
    '0930': false,
    '1000': false,
    '1030': false,
    '1100': false,
    '1130': false,
    '1200': false,
    '1230': false,
    '1300': false,
    '1330': false,
    '1400': false,
    '1430': false,
    '1500': false,
    '1530': false,
    '1600': false,
    '1630': false,
    '1700': false,
    '1730': false,
    '1800': false,
    '1830': false,
    '1900': false,
    '1930': false,
    '2000': false,
    '2030': false,
    '2100': false,
    '2130': false,
  });

  return (
    <>
      <Timeblock
        timesSelected={timesSelected}
        updateTimeSelected={updateTimeSelected}
      />
    </>
  );
}

export default DayBlock;
