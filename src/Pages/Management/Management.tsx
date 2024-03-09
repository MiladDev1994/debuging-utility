import React, { ChangeEvent, useEffect, useState } from 'react'
import styles from "./Management.module.scss"
import Button from '../../../src/Components/Common/Button/Button';
import { UseOnDataFromIpcMain } from '../../../src/hooks/UseOnDataFromIpcMain';
import { Toast } from '../../../src/Utils/Toast';

function Management() {

  const [keyValue, setKeyValue] = useState("")
  const [keys, setKeys] = useState([]);
  const [filterKeys, setFilterKeys] = useState([]);
  const [search, setSearch] = useState("")
  const [loading, setLoading] = useState<any>(false);

  UseOnDataFromIpcMain("xmlKeyCreate_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  UseOnDataFromIpcMain("xmlKeyRead_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  UseOnDataFromIpcMain("xmlKeyUpdate_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  UseOnDataFromIpcMain("xmlKeyDelete_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  UseOnDataFromIpcMain("xmlKeyUpdateAll_chanel", (event: any, data: any) => {
    if (data.status) {
      setKeys(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  const createKeyHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    setKeyValue("")
    window.api_electron.xmlKeyCreate(keyValue)
  }

  UseOnDataFromIpcMain("renameExe_chanel", (_event: any, data: string) => {
    setLoading(false)
  });

  useEffect(() => {
    window.api_electron.xmlKeyRead("all")
  } , [])

  useEffect(() => {
    if (keys.length) {
      const keysFiltered = keys.filter((item:any) => item.value.toUpperCase().includes(search.toUpperCase()))
      setFilterKeys(keysFiltered)
    }
  } , [keys, search])

  return (
    <div className={styles.managementContainer}>
      <div className={styles.renameXmlBox}>
        <Button
          title="Save Object"
          color="gray"
          titleColor='black'
          shape="round"
          fill="info"
          expand="full"
          iconWidth="2rem"
          iconHeight="2rem"
          onClick={() => {
            setLoading(true)
            window.api_electron.renameExe({name: "saveObject"})}
          } 
          classNames={{
            container: styles.renameBtn
          }}
          outlineColor='gray'
          outLineSize='2px'
          loading={loading}
        />

        <Button
          title="Origin"
          color="gray"
          titleColor='black'
          shape="round"
          fill="info"
          expand="full"
          iconWidth="2rem"
          iconHeight="2rem"
          onClick={() => {
            setLoading(true)
            window.api_electron.renameExe({name: "orig"})} 
          } 
          classNames={{
            container: styles.renameBtn
          }}
          outlineColor='gray'
          outLineSize='2px'
          loading={loading}
        />

      </div>

      <div className={styles.keysBox}>
        <div className={styles.headerContainer}>
          <form className={styles.inputBox} onSubmit={createKeyHandler}>
            <input
              value={keyValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setKeyValue(e.target.value)}
              placeholder='Add Key'
            />
            <Button
              title="Add"
              expand='block'
              color='success'
              fill='basic'
              icon='plus-lg'
              classNames={{
                container: styles.submitBtn
              }}
            />
          </form>
          <div className={styles.searchBox}>
            <input
              value={search}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
              placeholder='search...'
            />
          </div>
          <div className={styles.keyActBox}>
            <Button
              title="show all"
              expand='block'
              color='gray'
              fill='transparent'
              outlineColor='lightgray'
              outLineSize='1px'
              onClick={() => window.api_electron.xmlKeyUpdateAll(false)}
              classNames={{
                container: styles.keysActBtn
              }}
            />
            <Button
              title="hide all"
              expand='block'
              color='gray'
              fill='transparent'
              outlineColor='lightgray'
              outLineSize='1px'
              onClick={() => window.api_electron.xmlKeyUpdateAll(true)}
              classNames={{
                container: styles.keysActBtn
              }}
            />
          </div>
        </div>

        <div className={styles.showKeys}>
          {filterKeys.sort((a: any, b: any) => a.value.localeCompare(b.value)).map((item: any) => 
            <div key={item.id} className={styles.keyBox}>
              <div key={item.id} className={styles.key}>
                <h4>{item.value}</h4>
                <div className={styles.actionKey}>
                  <div className={`${styles.switchContainer} ${!item.act ? styles.switchContainerOn : styles.switchContainerOff}`} onClick={() => window.api_electron.xmlKeyUpdate(item.id)}>
                    <div className={`${styles.toggle} ${!item.act ? styles.toggleOn : styles.toggleOff}`}/>
                  </div>
                  <Button
                    icon='x'
                    expand='block'
                    color='gray'
                    fill='light'
                    iconWidth="2rem"
                    iconHeight="2rem"
                    shape='pill'
                    onClick={() => window.api_electron.xmlKeyDelete(item.id)}
                    classNames={{
                      container: styles.deleteBtn
                    }}
                  />
                </div>
              </div>  
            </div>
          )}
        </div>
      </div>

    </div>
  )
}


export default Management