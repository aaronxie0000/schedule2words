import "./App.css";
import { useState } from 'react'
import DayBlock from "./components/Dayblock";


function App() {
  const [multiSelectOn, updateMultiSelect] = useState(false)

  document.body.onmousedown = () => {
    updateMultiSelect(true)
  }

  document.body.onmouseup = () => {
    updateMultiSelect(false)
  }

  return (
    <div className="App">
      <p>Hii!!</p>
      <DayBlock multiSelectOn={multiSelectOn} />
    </div>
  );
}

export default App;
