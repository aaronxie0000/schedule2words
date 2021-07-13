import { useState } from "react";
import Blocks from "./Blocks";

function Timeblock({timesSelected, updateTimeSelected}) {

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
      <Blocks
        multiSelectOn={multiSelectOn}
        updateTimeSelected={updateTimeSelected}
        typeCanMouseOver={typeCanMouseOver}
        updateCanMouseOver={updateCanMouseOver}
        time="1500"
      />
      <Blocks
        multiSelectOn={multiSelectOn}
        updateTimeSelected={updateTimeSelected}
        typeCanMouseOver={typeCanMouseOver}
        updateCanMouseOver={updateCanMouseOver}
        time="1530"
      />
      <Blocks
        multiSelectOn={multiSelectOn}
        updateTimeSelected={updateTimeSelected}
        typeCanMouseOver={typeCanMouseOver}
        updateCanMouseOver={updateCanMouseOver}
        time="1600"
      />
      <Blocks
        multiSelectOn={multiSelectOn}
        updateTimeSelected={updateTimeSelected}
        typeCanMouseOver={typeCanMouseOver}
        updateCanMouseOver={updateCanMouseOver}
        time="1630"
      />
      <Blocks
        multiSelectOn={multiSelectOn}
        updateTimeSelected={updateTimeSelected}
        typeCanMouseOver={typeCanMouseOver}
        updateCanMouseOver={updateCanMouseOver}
        time="1700"
      />
    </div>
  );
}

export default Timeblock;
