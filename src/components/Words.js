/* eslint-disable no-undef */
import { useState } from "react";
import styles from "./styles/Words.module.css";
import { IoMdCopy } from "react-icons/io";
import { AiOutlineReload } from "react-icons/ai";
import dayjs from "dayjs";

function Words({ daysSelected, timesSelected }) {
  const [copied, updateCopied] = useState(false);
  const [defText, updateDefText] = useState("");

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
    if (rawTimes.avaDays.length === 0 || rawTimes.curLongest.length === 0) {
      return;
    }

    const stringAvaTimes = [];

    let firstTimeStart = new dayjs();
    const stringFirstTime = rawTimes.curLongest[0];
    firstTimeStart = firstTimeStart.set(
      "hour",
      parseInt(stringFirstTime.slice(0, 2))
    );
    firstTimeStart = firstTimeStart.set(
      "minute",
      parseInt(stringFirstTime.slice(2, 4))
    );

    let firstTimeEnd = new dayjs();
    const stringSecondTime = rawTimes.curLongest[1];
    firstTimeEnd = firstTimeEnd.hour(parseInt(stringSecondTime.slice(0, 2)));
    firstTimeEnd = firstTimeEnd.minute(parseInt(stringSecondTime.slice(2, 4)));
    firstTimeEnd = firstTimeEnd.add(30, "minutes");

    stringAvaTimes.push(
      "from " +
        firstTimeStart.format("h:mm A") +
        " to " +
        firstTimeEnd.format("h:mm A")
    );

    if (rawTimes.curSecond.length !== 0) {
      let secondTimeStart = new dayjs();
      const stringSecondTimeStart = rawTimes.curSecond[0];
      secondTimeStart = secondTimeStart.set(
        "hour",
        parseInt(stringSecondTimeStart.slice(0, 2))
      );
      secondTimeStart = secondTimeStart.set(
        "minute",
        parseInt(stringSecondTimeStart.slice(2, 4))
      );

      let secondTimeEnd = new dayjs();
      const stringSecondTimeEnd = rawTimes.curSecond[1];
      secondTimeEnd = secondTimeEnd.hour(
        parseInt(stringSecondTimeEnd.slice(0, 2))
      );
      secondTimeEnd = secondTimeEnd.minute(
        parseInt(stringSecondTimeEnd.slice(2, 4))
      );
      secondTimeEnd = secondTimeEnd.add(30, "minutes");

      stringAvaTimes.push(
        "from " +
        secondTimeStart.format("h:mm A") +
          " to " +
          secondTimeEnd.format("h:mm A")
      );
    }

    if (rawTimes.avaDays.length !== 1){
      rawTimes.avaDays[rawTimes.avaDays.length-1] = 'and ' + rawTimes.avaDays[rawTimes.avaDays.length-1]
    }

    const timeZone = new Date().toLocaleTimeString(undefined,{timeZoneName:'short'}).split(' ')[2]
    const option1 = 'I am in ' + timeZone + ', and I am available ' + stringAvaTimes[0] + (stringAvaTimes[1] ? " and " + stringAvaTimes[1] : " ") + " on " + rawTimes.avaDays.join(", ")


    updateDefText(option1)
  }

  function reloadHandle(){
    const rawTimes = getRawDayTime()
    parseToWords(rawTimes);
    if (chrome && chrome.storage){
      chrome.storage.sync.set({'schedule2wordsTimes': timesSelected});
      chrome.storage.sync.set({'schedule2wordsDays': daysSelected});
    }
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
        onClick={reloadHandle}
      >
        <AiOutlineReload size={16} />
      </button>
      <p>{defText}</p>
    </div>
  );
}

export default Words;
