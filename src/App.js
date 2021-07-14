import styles from "./App.module.css";
import DayBlock from "./components/Dayblock";

function App() {
  // const time = "1500";
  // const d = new Date();
  // d.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)));
  // console.log(d.getHours())

  return (
    <div>
      <p>Hii!!</p>
      <div className={styles.dayCont}>
        <DayBlock />
      </div>
    </div>
  );
}

export default App;
