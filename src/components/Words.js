import { useState } from "react";
import styles from "./styles/Words.module.css";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";

function Words({ daysSelected, timesSelected }) {
  const [copied, updateCopied] = useState(false);
  const [defText, updateDefText] = useState("");
  // const time = "1500";
  // const d = new Date();
  // d.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)));
  // console.log(d.getHours())

  function getRawDayTime() {
    const cur = findTimeBlocks(timesSelected);
    if (cur.curLongestVal === 0 || cur.curSecondVal === 0) {
      const allAva = findTimeIndv(timesSelected);
      const medPos = Math.round((allAva.length - 1) / 2);
      if (allAva.length === 0) {
        // no time entered
      } else if (cur.curLongestVal === 0 && allAva.length === 1) {
        cur.curLongest = [allAva[medPos], allAva[medPos]];
      } else if (cur.curLongestVal === 0) {
        cur.curLongest = [allAva[medPos], allAva[medPos]];
        cur.curSecond = [allAva[medPos - 1], allAva[medPos - 1]];
      } else {
        cur.curSecond = [allAva[medPos], allAva[medPos]];
      }
    }
    const avaDays = [];
    for (const day in daysSelected) {
      if (daysSelected[day] === true) {
        avaDays.push(day);
      }
    }

    cur["avaDays"] = avaDays;

    return cur;
  }

  function findTimeBlocks(allTimes) {
    const all = Object.keys(allTimes).sort();
    const cur = {
      curLongestVal: 0,
      curLongest: [], //just two values, start and end (just in raw, eg. 0800, 1230 which is really 8:00 AM to 1:00 PM)
      curSecondVal: 0,
      curSecond: [],
    };

    let fastPoint = null;
    let slowPoint = null;

    for (let i = 0; i < all.length; i++) {
      const curKey = all[i];

      if (allTimes[curKey] === true && slowPoint === null) {
        slowPoint = i;
      } else if (allTimes[curKey] === true) {
        fastPoint = i;

        // if continue until end of day as available
        if (fastPoint === all.length - 1) {
          if (fastPoint - slowPoint > cur.curLongestVal) {
            cur.curSecondVal = cur.curLongestVal;
            cur.curSecond = cur.curLongest;
            cur.curLongestVal = fastPoint - slowPoint;
            cur.curLongest = [all[slowPoint], all[fastPoint]];
          } else if (fastPoint - slowPoint > cur.curSecondVal) {
            cur.curSecondVal = fastPoint - slowPoint;
            cur.curSecond = [all[slowPoint], all[fastPoint]];
          }
        }
      } else if (allTimes[curKey] === false) {
        if (fastPoint - slowPoint > cur.curLongestVal) {
          cur.curSecondVal = cur.curLongestVal;
          cur.curSecond = cur.curLongest;
          cur.curLongestVal = fastPoint - slowPoint;
          cur.curLongest = [all[slowPoint], all[fastPoint]];
        } else if (fastPoint - slowPoint > cur.curSecondVal) {
          cur.curSecondVal = fastPoint - slowPoint;
          cur.curSecond = [all[slowPoint], all[fastPoint]];
        }
        slowPoint = null;
        fastPoint = null;
      }
    }
    return cur;
  }

  function findTimeIndv(allTimes) {
    const ans = [];
    const all = Object.keys(allTimes).sort();

    for (let i = 0; i < all.length; i++) {
      const curKey = all[i];
      let prevKey = false;
      let nextKey = false;
      if (i !== 0) {
        prevKey = all[i - 1];
      }
      if (i !== all.length - 1) {
        nextKey = all[i + 1];
      }
      if (allTimes[curKey] === true) {
        if (prevKey && allTimes[prevKey] !== false) {
          continue;
        }
        if (nextKey && allTimes[nextKey] !== false) {
          continue;
        }
        ans.push(all[i]);
      }
    }

    return ans;
  }

  function parseToWords(rawTimes) {
    console.log(rawTimes);
  }

  function copyAway() {
    findTimeBlocks(timesSelected);
    navigator.clipboard.writeText(defText).then(copySuccess);
  }

  function copySuccess() {
    updateCopied(true);
    setTimeout(() => {
      updateCopied(false);
    }, 1000);
  }

  return (
    <div className={styles.wordCont}>
      <button
        onClick={copyAway}
        className={
          copied
            ? styles.button + " " + styles.copied
            : styles.button + " " + styles.notCopied
        }
      >
        <IoMdCopy size={18} />
      </button>
      <button
        className={styles.enterButton}
        onClick={() => parseToWords(getRawDayTime())}
      >
        <AiOutlineReload size={16} />
      </button>
      <p>{defText}</p>
    </div>
  );
}

export default Words;
