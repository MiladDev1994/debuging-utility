
import './App.css';
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from "react-hot-toast";
import Home from "./Pages/Home/Home"
import Management from './Pages/Management/Management';
import Filter from './Pages/Filter/Filter';
import PageBar from './Components/Common/PageBar/PageBar';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { ImageDownFocusState, LastIdSeenState, ShowStateXml } from './Components/Recoil/Atoms';



function App() {
  
  const [lastId, setLastId] = useRecoilState(LastIdSeenState)
  const [imageClick, setImageClick] = useRecoilState(ImageDownFocusState);
  const setShowStateXml = useSetRecoilState(ShowStateXml)

//   UseOnDataFromIpcMain("getData_chanel", (event: any, data: any) => {
//     if (data.status) {
//         setDataInform(data.data)
//         setLastId(data.data.id)
//         setDirectoryValue(data.data.directory)
//         if (data.data.allRecord.length) setAllRecord(data.data.allRecord)
//     } else {
//         Toast("error", data.message)
//     }
// })

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

  const rightOrLeftHandler = (e: any) => {
    if (e.code === "Period") {
        nextBtnHandler()
    } else if (e.code === "Comma") {
        previousBtnHandler()
    }
}
  
  return (
    <div 
      tabIndex={0}
      className="container"
      onKeyDown={rightOrLeftHandler}
    >
      <PageBar />
      <div style={{width: "100vw", height: "calc(100vh - 65px)"}}>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/filter' element={<Filter />} />
          <Route path='/management' element={<Management />} />
        </Routes>
      </div>
      <Toaster/>
    </div>
  );
}

export default App;
