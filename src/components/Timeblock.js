import styles from "./styles/TimeBlock.module.css";
import { useEffect, useRef, useState } from "react";

function TimeBlock({
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

  if (time.slice(2, 4) === "00") {
    return (
      <div
        ref={blockRef}
        onMouseDown={respond}
        onMouseOver={respond}
        onClick={respond}
        className={
          clicked
            ? styles.clickedBlock + " " + styles.block
            : styles.unclickedblock + " " + styles.block
        }
      >
        <p>{time.slice(0, 2) + ":" + time.slice(2, 4)} </p>
      </div>
    );
  } else {
    return (
      <div
        ref={blockRef}
        onMouseDown={respond}
        onMouseOver={respond}
        onClick={respond}
        className={
          clicked
            ? styles.clickedBlock + " " + styles.halfBlock
            : styles.unclickedblock + " " + styles.halfBlock
        }
      ></div>
    );
  }
}

export default TimeBlock;
