import styles from "./styles/Timeblock.module.css";

function Timeblock({
  multiSelectOn,
  time,
  updateTimeSelected,
  typeCanMouseOver,
  updateCanMouseOver,
  timesSelected
}) {


  function respond(e) {
    if (e.type === "mousedown") {
      updateCanMouseOver(!timesSelected[time] ); // can change mouse over change status only if change to same as starting block's
      updateTimeSelected((prev) => ({ ...prev, [time]: !prev[time] }));
    } else if (!multiSelectOn) {
      return;
    } else if (e.type === "mouseover") {
      updateTimeSelected((prev) => ({ ...prev, [time]: typeCanMouseOver }));
    } else {
      updateTimeSelected((prev) => ({ ...prev, [time]: !prev[time] }));
    }
  }

  if (time.slice(2, 4) === "00") {
    return (
      <div
        onMouseDown={respond}
        onMouseOver={respond}
        onClick={respond}
        className={
          timesSelected[time]
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
        onMouseDown={respond}
        onMouseOver={respond}
        onClick={respond}
        className={
          timesSelected[time]
            ? styles.clickedBlock + " " + styles.halfBlock
            : styles.unclickedblock + " " + styles.halfBlock
        }
      ></div>
    );
  }
}

export default Timeblock;
