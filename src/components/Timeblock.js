import Blocks from "./Blocks";

function Timeblock({ multiSelectOn, timesSelected, updateTimeSelected }) {

    const time = '1500'
    const d = new Date()
    d.setHours(parseInt(time.slice(0, 2)), parseInt(time.slice(2, 4)))
    // console.log(d.getHours())

    console.log(timesSelected)
    
  return (
    <div>
      <Blocks multiSelectOn={multiSelectOn} updateTimeSelected={updateTimeSelected} time='1500' />
      <Blocks multiSelectOn={multiSelectOn} updateTimeSelected={updateTimeSelected} time='1530' />
      <Blocks multiSelectOn={multiSelectOn} updateTimeSelected={updateTimeSelected} time='1600' />
      <Blocks multiSelectOn={multiSelectOn} updateTimeSelected={updateTimeSelected} time='1630' />
      <Blocks multiSelectOn={multiSelectOn} updateTimeSelected={updateTimeSelected} time='1700' />
    </div>
  );
}

export default Timeblock;
