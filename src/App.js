import { useState } from "react";
import styles from "./App.module.css";
import Day from "./components/Day";
import Time from "./components/Time";
import Words from "./components/Words";

function App() {

  // times are start time, eg. 2130 is true means free from 2130 to 2200 (+30min)
  const [timesSelected, updateTimeSelected] = useState({
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
  });

  const [daysSelected, updateDaySelected] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
  });

  return (
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
      <div className={styles.wordCont}>
        <Words daysSelected={daysSelected} timesSelected={timesSelected}/>
      </div>
    </div>
  );
}

export default App;
