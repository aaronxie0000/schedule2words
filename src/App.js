import "./App.css";
import Blocks from "./components/Blocks";

function App() {
  return (
    <div className="App">
      <p>Hii!!</p>
      <Blocks time='15:00' day='Wednesday'/>
      <Blocks time='16:00' day='Wednesday'/>
    </div>
  );
}

export default App;
