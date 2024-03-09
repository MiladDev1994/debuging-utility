import React, { ChangeEvent, useEffect, useState } from 'react'
import Button from '../../../Components/Common/Button/Button';
import styles from "./Header.module.scss"
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AllRecordState, DataInform, DirectorySelectedState, LastIdSeenState } from '../../../../src/Components/Recoil/Atoms';
import { UseOnDataFromIpcMain } from '../../../hooks/UseOnDataFromIpcMain';
import { Toast } from '../../../Utils/Toast';
function Header() {

    const [allRecordFilter, setAllRecordFilter] = useState<any>([])
    const [allRecordDrop, setAllRecordDrop] = useState(false)
    const [searchValue, setSearchValue] = useState("")
    const [lastId, setLastId] = useRecoilState(LastIdSeenState)
    const [allRecord, setAllRecord] = useRecoilState(AllRecordState)
    const setDataInform = useSetRecoilState(DataInform)
    const [directoryValue, setDirectoryValue] = useRecoilState(DirectorySelectedState)
    const [loading, setLoading] = useState(false)
    let dropAct = false

    const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(e.target.value)
        const filtered = allRecord.filter((item: any) =>
            item.id === (+e.target.value) ||
            `${item.path.split("\\").pop()} / ${item.file}`.includes(e.target.value)
        )
        setAllRecordFilter(filtered)
    }



    useEffect(() => {
        setAllRecordFilter(allRecord)
    } , [allRecord])

    const recordSelected = () => {
        const findRecord: any = (allRecord ?? []).find((item: any) => item.id === lastId)
        if (!findRecord) return "Undefined"
        return `${findRecord.id}) ${findRecord.path.split("\\").pop()}`;
    }

    useEffect(() => {
        recordSelected()
    } , [lastId])
    

    UseOnDataFromIpcMain("walk_chanel", (event: any, data: any) => {
        if (data.status) {
            setDirectoryValue(data.directory)
            setDataInform(data.data)
            setLastId(data.data.id)
            if (data.files.length) setAllRecord(data.files)
            setLoading(false)
        } else {
            Toast("error", data.message)
            console.log("error")
            setLoading(false)
        }
    })

    const walkHandler = (e: ChangeEvent<HTMLFormElement>) => {
        e.preventDefault()
        setLoading(true)
        window.api_electron.walk({directory: directoryValue})
    }

    return (
        <div className={styles.navbarContainer}>
            <div className={styles.navbar}>

                <div 
                    // onSubmit={walkHandler}
                    className={styles.formDirectory}
                >
                    <input 
                        type='text'
                        placeholder='directory'
                        value={directoryValue}
                        // onChange={(e: ChangeEvent<HTMLInputElement>) => setDirectoryValue(e.target.value)}
                        className={styles.searchRecord}
                        disabled
                    />
                    <Button
                        icon='box-arrow-in-down'
                        expand='block'
                        fill='light'
                        color='gray'
                        loading={loading}
                        onClick={() => window.api_electron.selectedDir()}
                        classNames={{
                            container: styles.submitBtn
                        }}
                    />
                </div>
                <h1>{allRecord.length}</h1>
                <div 
                    tabIndex={0} 
                    className={styles.selectRecord} 
                    onBlur={() => !dropAct && setAllRecordDrop(false)}
                >
                    <Button
                        title={recordSelected()}
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
                            <input 
                                type='text'
                                placeholder='search...'
                                className={styles.searchRecord}
                                onChange={changeHandler}
                                value={searchValue}
                            />
                            <div className={styles.recordBox}>
                                {allRecordFilter.map((item: any) =>
                                    <div 
                                        key={item.id} 
                                        className={`${styles.recordItem} ${styles[item.status]}`} 
                                        onMouseDown={() => {
                                            setSearchValue("")
                                            window.api_electron.getData({id: item.id, type: "first"})
                                        }}
                                        style={{
                                            backgroundColor: lastId === item.id ? "lightgray" : "",
                                        }}
                                    >
                                        <span className={styles.recordId}>{item.id}</span>
                                        <span className={styles.recordName}>{`${item.path.split("\\").pop()}`}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default Header;