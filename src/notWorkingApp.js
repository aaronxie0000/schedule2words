/* eslint-disable no-undef */
import { useEffect, useState, useRef } from "react";
import styles from "./App.module.css";
import Day from "./components/Day";
import Time from "./components/Time";
import Words from "./components/Words";

function App() {
  const didMountRef1 = useRef(false);
  const didMountRef2 = useRef(false);

  const defTimes = {
    "0800": false,
    "0830": false,
    "0900": false,
    "0930": false,
    1000: false,
    1030: false,
    1100: false,
    1130: false,
    1200: false,
    1230: false,
    1300: false,
    1330: false,
    1400: false,
    1430: false,
    1500: false,
    1530: false,
    1600: false,
    1630: false,
    1700: false,
    1730: false,
    1800: false,
    1830: false,
    1900: false,
    1930: false,
    2000: false,
    2030: false,
    2100: false,
    2130: false,
  };
  const [timesSelected, updateTimeSelected] = useState(() => {
    if (chrome) {
      chrome.storage.sync.get(["schedule2wordsTimes"], (res) => {
        console.log(res)
        if (!res.schedule2wordsTimes) {
          console.log("Created Default")
          return defTimes;
        }
        return res.schedule2wordsTimes;
      });
    } else {
      return defTimes;
    }
  });

  useEffect(() => {
    if (didMountRef1.current === false) {
      didMountRef1.current = true;
    } else {
      if (chrome) {
        chrome.storage.sync.set({ schedule2wordsTimes: timesSelected });
      } else {
      }
    }
  }, [timesSelected]);

  const defDays = {
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  };

  const [daysSelected, updateDaySelected] = useState(() => {
    if (chrome) {
      chrome.storage.sync.get(["schedule2wordsDays"], (res) => {
        if (!res.schedule2wordsDays) {
          return defDays;
        }
        console.log(res);
        return res.schedule2wordsDays;
      });
    } else {
      return defDays;
    }
  });

  useEffect(() => {
    if (didMountRef2.current === false) {
      didMountRef2.current = true;
    } else {
      if (chrome) {
        chrome.storage.sync.set({ schedule2wordsDays: daysSelected });
      } else {
      }
    }
  }, [daysSelected]);

  return (
    <>
      <div className={styles.topBar}>
        <p>schedule2words</p>
      </div>
      <div className={styles.mainCont}>
        <div className={styles.timeCont}>
          <Time
            timesSelected={timesSelected}
            updateTimeSelected={updateTimeSelected}
          />
        </div>
        <div className={styles.dayCont}>
          <Day
            daysSelected={daysSelected}
            updateDaySelected={updateDaySelected}
          />
        </div>

        <Words daysSelected={daysSelected} timesSelected={timesSelected} />
      </div>
    </>
  );
}

export default App;
