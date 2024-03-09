import { useState } from "react";
import styles from "./Image.module.scss"
import { useRecoilState } from "recoil";
import { imageDescription } from "../../../Components/Recoil/Atoms";

const Image = (props: any) => {

    const [imageDes, setImageDes] = useRecoilState(imageDescription)
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    const loadHandler = (e: any) => {
        setSize({
            width: e.target.naturalWidth,
            height: e.target.naturalHeight,
        })
    }


    return (
        <div 
            className={styles.image} style={props.style}
            onMouseOver={() => setImageDes({show: true, data: props.image.description})} 
            onMouseLeave={() => setImageDes({...imageDes, show: false})}
        >
            <img 
                onLoad={loadHandler} 
                src={props.image.image} 
                style={{
                    width: size.width > size.height ? "100%" : "unset",
                    height: size.width > size.height ? "unset" : "100%",
                }}
            />
        </div>
    )
}

export default Image;