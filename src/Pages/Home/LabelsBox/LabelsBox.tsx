import React, { useEffect, useState } from 'react'
import styles from "./LabelsBox.module.scss"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DataInform, ImageDownFocusState, ImageTopFocusState, ShowStateXml } from '../../../Components/Recoil/Atoms';
import { UseOnDataFromIpcMain } from '../../../../src/hooks/UseOnDataFromIpcMain';
import Button from '../../../../src/Components/Common/Button/Button';

function LabelsBox() {

  const dataInform = useRecoilValue(DataInform);
  const showStateXml = useRecoilValue(ShowStateXml);
  const setShowStateXml = useSetRecoilState(ShowStateXml)
  const [imageClickTop, setImageTopClick] = useRecoilState(ImageTopFocusState);
  const [imageClickDown, setImageDownClick] = useRecoilState(ImageDownFocusState);
  const [keys, setKeys] = useState<any>([])


  UseOnDataFromIpcMain("xmlKeyRead_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data.map((item: any) => item.value))
    } else {
    }
})

  useEffect(() => {
    window.api_electron.xmlKeyRead("active")
  } , [])


  return (
    <div className={styles.attributeContainer}>
        <div className={styles.attributeItemContainer}>

          <div className={styles.xmlDocBox}>
            {["Top", "Down"].map(doc =>
              <div className={styles.xml} key={doc}>
                <h3>XML Doc {doc}</h3>
                <div className={styles.xmlData}>
                  {dataInform[`doc${doc}`].opencv_storage ? Object.entries(dataInform[`doc${doc}`].opencv_storage).map(([key, value]: any) => 
                    !keys.some((item: any) => item.toUpperCase() === key.toUpperCase()) && 
                    <ShowXML
                      key={key}
                      obj={key}
                      value={value}
                    />  
                  ):
                    <h2> Not Exist !!!</h2>
                  }
                </div>
              </div>
            )} 
          </div>


          {showStateXml.active &&
            <div className={styles.xmlState}>
              <div className={styles.title}>
                <h3>XML State</h3>
                <Button
                  expand='block'
                  fill='info'
                  icon='x'
                  shape='pill'
                  color='gray'
                  onClick={() => {
                    // setImageClick(0)
                    setImageTopClick(0)
                    setImageDownClick(0)
                    setShowStateXml({
                      active: false,
                      data: ""
                    })
                  }}
                  classNames={{
                    container: styles.closeBtn
                  }}
                />
              </div>
              <div className={styles.xmlData}>
                {showStateXml.data.opencv_storage && Object.entries(showStateXml.data.opencv_storage).map(([key, value]: any) =>
                  !keys.some((item: any) => item.toUpperCase() === key.toUpperCase()) && 
                  <ShowXML
                    key={key}
                    obj={key}
                    value={value}
                  /> 
                )}
              </div>
            </div>
          }

        </div>
    </div>
  )
}



const ShowXML = ({obj, value}: any) => {

  const typeOfXml = () => {
    switch (typeof value) {
      case "string": return value.split(" ").map((ele: any, index) => 
          <div
            key={index}
            className={styles.xmlValueItem}
          >
            {!isNaN(+ele) ?
              Math.round(+ele).toFixed(3) :
              ele
            }
          </div>
        )
      case "number": 
        return <div className={styles.xmlValueItem}>
          {value.toFixed(3)}
        </div>
      case "object": return Object.entries(value).map(([key, value]: any) => 
        <h4 key={key}>
          <span>{`${key} : `}</span> 
          {value}
        </h4>
      )
      default: return <></>
    }
  }

  return (
    <h4 className={styles.xmlHeader} >
      <span>{`${obj}`}</span> 
      <div className={styles.xmlValueBox}>
        {typeOfXml()}
      </div>
    </h4>
  )

}

export default LabelsBox;



