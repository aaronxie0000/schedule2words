function Dayblock({ daysSelected, updateDaySelected }) {
  return (
    <div>
      {Object.keys(daysSelected).map((key, index) => (
        <div>{key.slice(0,3)}</div>
      ))}
    </div>
  );
}
export default Dayblock;
