import styles from "./styles/Block.module.css";
import { useEffect, useRef, useState } from "react";

function Blocks({ multiSelectOn, time, updateTimeSelected }) {
  const didMountRef = useRef(false);

  const blockRef = useRef();
  const [clicked, updateClicked] = useState(false);

  useEffect(() => {
    if (didMountRef.current) {
      updateTimeSelected((prev) => ({ ...prev, [time]: !prev[time] }));
    } else {
      didMountRef.current = true;
    }
  }, [clicked, updateTimeSelected, time]);

  function respond(e) {
    if (!multiSelectOn & (e.type !== "mousedown")) {
      return;
    }
    updateClicked((prev) => !prev);
  }

  return (
    <div
      ref={blockRef}
      onMouseDown={respond}
      onMouseOver={respond}
      onClick={respond}
      className={clicked ? styles.clickedBlock : styles.block}
    ></div>
  );
}

export default Blocks;
