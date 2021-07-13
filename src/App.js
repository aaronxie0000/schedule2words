import "./App.css";
import DayBlock from "./components/Dayblock";

function App() {
  // const time = "1500";
  // const d = new Date();
  // d.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)));
  // console.log(d.getHours())

  return (
    <div className="App">
      <p>Hii!!</p>
      <DayBlock />
    </div>
  );
}

export default App;
