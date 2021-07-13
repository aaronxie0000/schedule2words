import styles from './styles/Block.module.css'
import {useRef, useState } from 'react'

function Blocks({time, day}){

    const blockRef = useRef()
    const [clicked, updateClicked] = useState(false)

    function respond(){
        updateClicked(prev=> !prev)
        if (clicked){
            blockRef.current.className = styles.block
        }
        else{
            console.log(time, day);
            blockRef.current.className = styles.clickedBlock
        }

    }

    return(
        <div ref={blockRef} onClick={respond} className={styles.block}>
            
        </div>
    )
}

export default Blocks