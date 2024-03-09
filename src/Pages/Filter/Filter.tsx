import React, { useEffect, useState } from 'react'
import { UseOnDataFromIpcMain } from '../../../src/hooks/UseOnDataFromIpcMain';
import styles from "./Filter.module.scss"
import { Toast } from '../../../src/Utils/Toast';
import Select from '../../../src/Components/Common/Select/Select';
import Icon from '../../../src/Components/Common/Icon/Icon';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { FilterState, LastIdSeenState } from '../../../src/Components/Recoil/Atoms';
import { useNavigate } from 'react-router-dom';

function Filter() {

  const filters = [
    {
      id: 1, 
      name: "top", 
      option: [
        {id: 1, name: "don't care", value: null},
        {id: 2, name: "exist", value: true},
        {id: 3, name: "not exist", value: false}
      ]
    },
    {
      id: 2, 
      name: "down", 
      option: [
        {id: 1, name: "don't care", value: null},
        {id: 2, name: "exist", value: true},
        {id: 3, name: "not exist", value: false}
      ]
    },
    {
      id: 3, 
      name: "status", 
      option: [
        {id: 1, name: "don't care", value: ""},
        {id: 2, name: "accept", value: "accept"},
        {id: 3, name: "reject", value: "reject"},
      ]
    }
  ]

  const navigate = useNavigate()
  const [count, setCount] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const setLastId = useSetRecoilState(LastIdSeenState)
  const filter = useRecoilValue(FilterState)

  UseOnDataFromIpcMain("count_chanel", (event: any, data: any) => {
    if (data.status) {
      setCount(data.data)
    } else {
      // Toast("error", data.message)
    }
  })

  UseOnDataFromIpcMain("filter_chanel", (event: any, data: any) => {
    if (data.status) {
      if (data.data.length) setLastId(data.data[0].id)
      setFilteredData(data.data)
    } else {
      Toast("error", data.message)
    }
  })

  const dbClickHandler = (id: number) => {
    setLastId(id)
    navigate("/")
  }

  useEffect(() => {
    window.api_electron.count()
  } , [])

  useEffect(() => {
    window.api_electron.filter(filter)
  } , [filter])


  return (
    <div className={styles.filterContainer}>
      <div className={styles.filter}>

        <div className={styles.countContainer}>
          {Object.entries(count).map(([keys, value]: any) => 
            <div key={keys} className={styles.countCard}>
              <h3>{keys.replace("num", "")}</h3>
              <h1>{value === -1 ? 0 : value}</h1>
            </div>
          )}
        </div>

        <div className={styles.filterBox}>
          {filters.map(item => 
            <Select
              key={item.id}
              data={item}
            />  
          )}
        </div>

        <div className={styles.folderBox}>
            {filteredData.map((item: any) => 
              <div 
                key={item.id} 
                className={styles.folder}
                onDoubleClick={() => dbClickHandler(item.id)}
                tabIndex={0}
              >
                <Icon
                  name='folder-fill'
                  width="150px"
                  height="150px"
                  color='orange'
                />
                <h5>{item.path.split("~").pop()}</h5>
              </div>  
            )}
        </div>
      </div>
    </div>
  )
}





export default Filter