import { useState } from "react";
import styles from "./styles/Words.module.css";
import { IoMdCopy } from "react-icons/io";

function Words({ daysSelected, timesSelected }) {
  const [copied, updateCopied] = useState(false);
  // const time = "1500";
  // const d = new Date();
  // d.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)));
  // console.log(d.getHours())

  const avaTimes = [];

  for (const time in timesSelected) {
    if (timesSelected[time] === true) {
      avaTimes.push(time);
    }
  }

  const option1 = avaTimes.join(", ");

  function copyAway() {
    navigator.clipboard.writeText(option1).then(copySuccess);
  }

  function copySuccess() {
    updateCopied(true);
    setTimeout(() => {
      updateCopied(false);
    }, 1000);
  }

  return (
    <div>
      <button
        onClick={copyAway}
        className={copied ? styles.button + ' ' + styles.copied : styles.button + ' ' +  styles.notCopied}
      >
        <IoMdCopy size={18} />
      </button>
      <div className={styles.wordCont}>
        <p>{option1}</p>
      </div>
    </div>
  );
}

export default Words;
