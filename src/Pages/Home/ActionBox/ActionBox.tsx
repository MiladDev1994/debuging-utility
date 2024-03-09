import React, { useState } from 'react'
import Button from '../../../Components/Common/Button/Button';
import styles from "./ActionBox.module.scss"

function ActionBox() {

const button = new Array(1, 2, 3, 4);
const [shoeSearch, setShowSearch] = useState(false)

  return (
    <div 
        className={styles.submitContainer}
        style={{height: shoeSearch ? "10rem" : "0"}}
    >
        <div className={styles.showSearchBtnBox}>
            <Button
                color="secondary"
                fill="basic"
                icon="angleTop"
                shape='pill'
                expand='block' 
                iconWidth="1.5rem"
                iconHeight="1.5rem"
                onClick={() => setShowSearch(!shoeSearch)}
                classNames={{
                    container: styles.showSearchBtn
                }}
                iconRotate={shoeSearch ? -180 : 0}
            />
        </div>
        <div 
            className={styles.submitBox} 
        >
            {button.map((item, index) => 
                <Button
                    key={index}
                    title="Test" 
                    color="gray"
                    fill="basic"
                    iconWidth="1.5rem"
                    iconHeight="1.5rem"
                    onClick={console.log}
                />
            )}
            
        </div>
    </div>
  )
}

export default ActionBox;