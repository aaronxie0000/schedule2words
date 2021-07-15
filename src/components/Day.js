import Dayblock from "./Dayblock";
import styles from './styles/Day.module.css'

function Day({ daysSelected, updateDaySelected }) {
  return (
    <div className={styles.dayCont}>
      {Object.keys(daysSelected).map((key, index) => (
        <Dayblock key={index} day={key} daysSelected={daysSelected} updateDaySelected={updateDaySelected}/>
      ))}
    </div>
  );
}
export default Day;
