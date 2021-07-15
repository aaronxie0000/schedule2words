import styles from './styles/Dayblock.module.css'

function Dayblock({day, updateDaySelected, daysSelected}){

    function handleDay(){
        updateDaySelected((prev) => ({ ...prev, [day]: !prev[day] }));
    }

    return(
        <div onClick={handleDay} className={daysSelected[day] ? styles.day + ' ' + styles.selected :  styles.day + ' ' + styles.unselected }>
            {day.slice(0, 3)}
        </div>
    )
}

export default Dayblock;