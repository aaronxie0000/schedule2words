import { useState } from 'react';
import styles from './styles/Dayblock.module.css'

function Dayblock({day, updateDaySelected}){
    const [clicked, updateClicked] = useState(false)

    function handleDay(){
        updateClicked(prev=> !prev)
        updateDaySelected((prev) => ({ ...prev, [day]: !prev[day] }));
    }

    return(
        <div onClick={handleDay} className={clicked ? styles.day + ' ' + styles.selected :  styles.day + ' ' + styles.unselected }>
            {day.slice(0, 3)}
        </div>
    )
}

export default Dayblock;