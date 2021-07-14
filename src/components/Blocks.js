import styles from "./styles/Block.module.css";
import { useEffect, useRef, useState } from "react";

function Blocks({
  multiSelectOn,
  time,
  updateTimeSelected,
  typeCanMouseOver,
  updateCanMouseOver,
}) {
  const didMountRef = useRef(false);

  const blockRef = useRef();
  const [clicked, updateClicked] = useState(false);

  useEffect(() => {
    if (didMountRef.current) {
      updateTimeSelected((prev) => ({ ...prev, [time]: !prev[time] }));
    } else {
      didMountRef.current = true;
    }
  }, [clicked]); // eslint-disable-line react-hooks/exhaustive-deps

  function respond(e) {
    if (e.type === "mousedown") {
      updateCanMouseOver(!clicked); // can change mouse over change status only if change to same as starting block's
      updateClicked((prev) => !prev);
    } else if (!multiSelectOn) {
      return;
    } else if (e.type === "mouseover") {
      updateClicked(typeCanMouseOver);
    } else {
      updateClicked((prev) => !prev);
    }
  }

  return (
    <div
      ref={blockRef}
      onMouseDown={respond}
      onMouseOver={respond}
      onClick={respond}
      className={clicked ? styles.clickedBlock + ' ' + styles.block : styles.unclickedblock  + ' ' + styles.block }
    >{time.slice(0,2) + ':' + time.slice(2, 4)}</div>
  );
}

export default Blocks;
