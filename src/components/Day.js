import DayBlock from "./DayBlock";
import styles from './styles/Day.module.css'

function Day({ daysSelected, updateDaySelected }) {
  return (
    <div className={styles.dayCont}>
      {Object.keys(daysSelected).map((key, index) => (
        <DayBlock key={index} day={key} updateDaySelected={updateDaySelected}/>
      ))}
    </div>
  );
}
export default Day;
