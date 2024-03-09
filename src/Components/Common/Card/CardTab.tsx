import React, { useEffect, useRef, useState } from "react";

import { CardTabDefaultProps, CardTabType } from "./Types";
import CardTabNav from "./CardTabNav";
import styles from "./CardTab.module.scss";
import Button from "../Button/Button";

const CardTab = (props: CardTabType) => {

  const [activeTabNav, setActiveTabNav] = useState<number>(1);
  const [showScrollBtn, setShowScrollBtn] = useState<boolean>(false);
  const container = useRef<any>(null);
  const tabNav = useRef<any>(null);
  const [showBtn, setShowBtn] = useState<{ left: boolean, right: boolean }>({ left: false, right: true });
  const [screenWidth, setScreenWidth] = useState<number>(0);

  const scrollRightHandler = () => {
    tabNav.current.scrollLeft += 200;
  };

  const scrollLeftHandler = () => {
    tabNav.current.scrollLeft -= 200;
  };

  const showBtnHandler = () => {
    switch (true) {
      case (tabNav.current.scrollLeft < 5 && tabNav.current.scrollLeft > -5):
        if (props.rtl) {
          setShowBtn({
            left: true,
            right: false,
          })
        } else {
          setShowBtn({
            left: false,
            right: true,
          })
        }
      break;
      case ((tabNav.current.scrollWidth - (props.rtl ? -tabNav.current.scrollLeft+5 : tabNav.current.scrollLeft + 5)) <= container.current.scrollWidth):
        if (props.rtl) {
          setShowBtn({
            left: false,
            right: true,
          })
        } else {
          setShowBtn({
            left: true,
            right: false,
          })
        }
      break;
      default :
        setShowBtn({
          left: true,
          right: true,
        })
      break;
    };
  };

  useEffect(() => {
    setScreenWidth(window.innerWidth)
    window.addEventListener("resize", () => setScreenWidth(window.innerWidth))
  } , []);
  
  useEffect(() => {
    if (tabNav.current.scrollWidth > container.current.scrollWidth) {
      setShowScrollBtn(true)
    } else {
      setShowScrollBtn(false)
    }
  } , [screenWidth]);

  useEffect(() => {
    if (props.rtl) {
      setShowBtn({
        left: true,
        right: false,
      })
    } else {
      setShowBtn({
        left: false,
        right: true,
      })
    }
  }, [props.rtl]);

  function handleNavBar(index: number) {
    setActiveTabNav(() => index)
    props.onTabNav && props.onTabNav(index)
  };

  let cardTabNav = props.cardTabInfo?.map((item: {label: string, id: number}, idx: number) => {
    return (
      <CardTabNav
        key={`CardTabNav_${idx}`}
        label={item.label}
        index={item.id}
        handlClick={handleNavBar}
        classNames={
          activeTabNav === item.id
            ? `${styles.itemsNavChecked} ${props.classNames?.activeTabClassName && " " + props.classNames?.activeTabClassName}`
            : `${styles.itemsNavDisabled}${props.classNames?.deActiveTabClassName && " " + props.classNames?.deActiveTabClassName}`
        }
        style={
          activeTabNav === item.id
            ? props.style?.activeTabStyle
            : props.style?.deActiveTabStyle
        }
      />
    );
  });
  
  let cardTabBottom = props.cardTabInfo?.map((item: any, idx: any) => {
    return (activeTabNav === item.id &&
      <div
        key={`cardTabBottom_${idx}`}
        className={`${styles.cardTabBottom}${props.classNames?.cardTabBottom && " " + props.classNames?.cardTabBottom}`}
        style={props.style?.cardTabBottom}
      >
        {item.body}
      </div>
    );
  });
  
  // useEffect(() => {
  //   setActiveTabNav(() => 1);
  //   props.onTabNav && props.onTabNav(1);
  // }, [props.onTabNav]);

  return (
    <div
      ref={container}
      className={`${styles.container}${props.classNames?.containerClassName && " " + props.classNames?.containerClassName}`}
      style={props.style?.containerStyle}
    >
      {showScrollBtn && (
        <>
          {showBtn.right && (
            <Button
              icon="angleRight"
              iconWidth="0.7em"
              iconHeight="1em"
              onClick={scrollRightHandler}
              color="gray"
              style={{
                container: {
                  width: "2rem", 
                  height: "2rem", 
                  position: "absolute", 
                  right: "10px", 
                  top: "30%", 
                  backgroundColor: "white", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  boxShadow: "0 0 20px #BEBEBE",
                }
              }}
            />
          )}
          {showBtn.left && (

            <Button
              icon="angleLeft"
              iconWidth="0.7em"
              iconHeight="1em"
              onClick={scrollLeftHandler}
              color="gray"
              style={{
                container: {
                  width: "2rem", 
                  height: "2rem", 
                  position: "absolute", 
                  left: "10px", 
                  top: "30%", 
                  backgroundColor: "white", 
                  borderRadius: "10px", 
                  display: "flex", 
                  alignItems: "center", 
                  justifyContent: "center", 
                  boxShadow: "0 0 20px #BEBEBE",
                }
              }}
            />
          )}
        </>
      )}
      <div
        ref={tabNav}
        className={`${styles.cardTabNav}${props.classNames?.tabClassName && " " + props.classNames?.tabClassName}`}
        style={props.style?.tabStyle}
        onScroll={showBtnHandler}
      >
        {cardTabNav}
      </div>
      {cardTabBottom}
    </div>
  )
};

CardTab.defaultProps = CardTabDefaultProps;

export default CardTab;
