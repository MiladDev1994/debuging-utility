import React, { useEffect, useRef, useState } from 'react'
import styles from "./ImageBox.module.scss"
import Button from '../../../Components/Common/Button/Button';
import { RecoilState, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { DataInform, LastIdSeenState, ShowStateXml, ImageTopFocusState, ImageDownFocusState } from '../../../../src/Components/Recoil/Atoms';

function ImageBox() {

    const [saturate, setSaturate] = useState("1")
    const dataInform = useRecoilValue(DataInform)
    const lastId = useRecoilValue(LastIdSeenState)
    const [imageClick, setImageClick] = useRecoilState(ImageDownFocusState);
    const setShowStateXml = useSetRecoilState(ShowStateXml)

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
        <div className={styles.imageContainer}>
            <ImageComponent
                saturate={saturate}
                location="Top"
                data={dataInform.topImages}
                recoil={ImageTopFocusState}
            />
            <ImageComponent
                saturate={saturate}
                location="Down"
                data={dataInform.downImages}
                recoil={ImageDownFocusState}
            />
            <div className={styles.imageColors}>
                
                <div className={styles.rangeShow}>
                    <label>image saturate : </label>
                    <input type='range' min={0} max={5} step={0.01} defaultValue={1} onChange={e => setSaturate(e.target.value)}/>
                    <span>{Math.round( +saturate * 20)} %</span>
                </div>
                <Button
                    title="previous"
                    color="success"
                    shape="round"
                    fill="basic"
                    expand="block" 
                    icon='chevron-double-left'
                    onClick={previousBtnHandler} 
                    classNames={{
                        container: styles.actionBtn
                    }}
                    outLineSize='1px'
                />
                
                <Button
                    title="next"
                    color="success"
                    shape="round"
                    fill="basic"
                    expand="block" 
                    icon='chevron-double-right'
                    direction='row_reverse'
                    onClick={nextBtnHandler} 
                    classNames={{
                        container: styles.actionBtn
                    }}
                    outLineSize='1px'
                />
                
            </div>
        </div>
    )
}


const ImageComponent = ({
    saturate,
    location,
    data,
    recoil
}: {
    saturate: any
    location: any
    data: any
    recoil: RecoilState<number>
}) => {

    const [zoom, setZoom] = useState(200);
    const imageContainer = useRef<any>(null);
    const [imageClick, setImageClick] = useRecoilState(recoil);
    const [key, setKey] = useState("");
    const imageLength = data && data.length

    const zoomHandler = (e: any) => {
        if (key === "KeyZ") {
            if (e.deltaY < 0) {
                 setZoom(zoom + 40)
            } else {
                (zoom > 50) && setZoom(zoom - 40)
            }
        }
    }

    useEffect(() => {
        window.addEventListener("keydown", e => setKey(e.code))
        window.addEventListener("keyup", () => setKey(""))
    } , [])

    const keyHandler = (e: any) => {
        const numberInRow = Math.floor((imageContainer.current.scrollWidth) / zoom)
        switch (e.nativeEvent.code) {
            case "ArrowRight":
                if (imageClick < imageLength) setImageClick(prev => prev + 1);
                break;
            case "ArrowLeft":
                if (imageClick > 1) setImageClick(prev => prev - 1);
                break;
            case "ArrowUp":
                if (imageClick - numberInRow > 0) setImageClick(prev => prev - numberInRow);
                break;
            case "ArrowDown":
                if (imageClick + numberInRow <= imageLength) setImageClick(prev => prev + numberInRow);
                break;
            default: setImageClick(0);
        }
    }

    return (
        <div 
            ref={imageContainer}
            tabIndex={0}
            className={styles.imageTop}
            onWheelCapture={zoomHandler}
            onKeyDown={keyHandler}
            style={{overflow: key === "KeyZ" ? "hidden" : "auto"}}
        >
            <h3>{location}</h3>
            {data && data.length ? 
                data.map((item: any, index: number) => 
                    <Image 
                        key={index}
                        item={item}
                        index={index + 1}
                        saturate={saturate}
                        zoom={zoom}
                        imageClick={imageClick}
                        setImageClick={setImageClick}
                    />
                ) :
                <h1> Not Exist !!!</h1>
            }
        </div>
    )
}

const Image = ({
    item,
    index,
    saturate,
    zoom,
    imageClick,
    setImageClick
}: any) => {

    
    const setShowStateXml = useSetRecoilState(ShowStateXml)
    const imageRef = useRef<any>(null)

    useEffect(() => {
        imageClick === index && imageRef.current.click()
    } , [imageClick])

    return (
        <div 
            ref={imageRef}
            tabIndex={0}
            className={`${styles.imageBox}${imageClick === index ? " " + styles.imageSelected : ""}`} 
            style={{width: `${zoom}px`}}
            onClick={() => {
                setImageClick(index)
                setShowStateXml({
                    active: true,
                    data: item.state
                })
            }} 
            onBlur={() => {
                // setImageClick(0)
                // setShowStateXml({
                //     active: false,
                //     data: ""
                // })
            }}
        >
            <img 
                src={`data:image/jpeg;base64,${item.image}`} 
                style={{
                    filter: `saturate(${saturate})`
                }}
            />
        </div>
    )
}

export default ImageBox;



