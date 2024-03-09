import { useEffect, useState } from "react";
import styles from "./HomeComponent.module.scss"

import { useRecoilState, useSetRecoilState } from 'recoil'
import { AllRecordState, DataInform, DirectorySelectedState, ImageDownFocusState, LastIdSeenState, ShowStateXml, userNameState }from "../../Components/Recoil/Atoms";

import Header from "./Header/Header";
import ImageBox from "./ImageBox/ImageBox";
import LabelsBox from "./LabelsBox/LabelsBox";
import { UseOnDataFromIpcMain } from "../../../src/hooks/UseOnDataFromIpcMain";
import { Toast } from "../../../src/Utils/Toast";
// import ActionBox from "./ActionBox/ActionBox";


const Home = () => { 

    const setDataInform = useSetRecoilState(DataInform)
    const setAllRecord = useSetRecoilState(AllRecordState)
    const [lastId, setLastId] = useRecoilState(LastIdSeenState)
    const setDirectoryValue = useSetRecoilState(DirectorySelectedState)
    const [imageClick, setImageClick] = useRecoilState(ImageDownFocusState);
    const setShowStateXml = useSetRecoilState(ShowStateXml)

    UseOnDataFromIpcMain("getData_chanel", (event: any, data: any) => {
        if (data.status) {
            setDataInform(data.data)
            setLastId(data.data.id)
            setDirectoryValue(data.data.directory)
            if (data.data.allRecord.length) setAllRecord(data.data.allRecord)
        } else {
            Toast("error", data.message)
        }
    })

    const nextBtnHandler = () => {
        window.api_electron.getData({id: lastId, type: "next"})
        setImageClick(0)
        setShowStateXml({
            active: false,
            data: {}
        })
    }

    const previousBtnHandler = () => {
        window.api_electron.getData({id: lastId, type: "previous"})
        setImageClick(0)
        setShowStateXml({
            active: false,
            data: {}
        })
    }
    
    useEffect(() => {
        window.api_electron.getData({id: lastId, type: "first"})
    } , [])
    
    return (
        <div 
            tabIndex={0}
            className={styles.container}
        >
            <Header />

            <div className={styles.mainContainer}>
                <div className={styles.mainBox}>
                    <ImageBox />
                    <LabelsBox />
                </div>
            </div>

            {/* <ActionBox /> */}

        </div>
    )
}

export default Home;
