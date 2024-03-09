

import { useEffect, useState } from "react";
import styles from "./Select.module.scss"
import Button from "../Button/Button";
import { FilterState } from "../../../../src/Components/Recoil/Atoms";
import { useRecoilState } from "recoil";

const Select = ({data}: any) => {

    const [allRecordDrop, setAllRecordDrop] = useState(false)
    const [filter, setFilter] = useRecoilState(FilterState)
    let dropAct = false;
  
    const selectHandler = (values: any) => {
        if (values.value === null) {
            const newFilter: any = {...filter};
            delete newFilter[data.name]
            setFilter(newFilter);
        } else {
            setFilter({
                ...filter,
                [data.name]: values.value
            })
        }
    }


    return (
        <div 
            tabIndex={0} 
            className={styles.selectRecord} 
            onBlur={() => !dropAct && setAllRecordDrop(false)}
        >
            <label>{data.name}</label>
            <Button
                title={data.option.find((item: any) => item.value === filter[data.name as "top" | "down" | "status"])?.name || "don't care"}
                color='gray'
                fill='light'
                outLineSize='1px'
                outlineColor='lightgray'
                expand='full'
                icon='chevron-down'
                iconWidth="1.1rem"
                iconHeight="1.1rem"
                iconRotate={allRecordDrop ? 180 : 0}
                direction='row_reverse'
                onClick={() => setAllRecordDrop(prev => !prev)}
                classNames={{
                    container: styles.btnContainer
                }}
            />

            {allRecordDrop && 
                <div 
                    className={styles.allRecordDrop} 
                    onClick={() => setAllRecordDrop(true)}
                    onMouseDown={() => dropAct = true}
                    onMouseUp={() => dropAct = false}
                >
                    <div className={styles.recordBox}>
                        {data.option.map((item: any) =>
                            <div 
                                key={item.id} 
                                className={`${styles.recordItem}`} 
                                onMouseDown={() => selectHandler(item)}
                            >
                                <span className={styles.recordId}>{item.name}</span>
                            </div>
                        )}
                    </div>
                </div>
            }
        </div>
    )
  }


  export default Select;