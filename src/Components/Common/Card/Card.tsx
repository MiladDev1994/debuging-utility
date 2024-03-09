import React from "react";
import { CardTypes } from "./Types";
import TitleCard from "../TitleCard/TitleCard";
import styles from "./Card.module.scss";

const Card = (props: CardTypes) => {
  
  return (
    <div
      className={`${styles.Container}${props.classNames?.container ? " " + props.classNames.container : ""}`}
      style={props.style?.container}
    >
      {props.customHeader && props.customHeader}

      {!props.customHeader && props.title && (
        <TitleCard
          title={props.title}
          children={props.titleChildren}
          customClick={props.titleCustomClick}
          hasBackBtn={props.titleHasBackBtn}
          classNames={{ container: `${styles.title}${props.classNames?.title ? " " + props.classNames.title : ""}` }}
          style={{container: props.style?.title}}
        />
      )}

      {props.children && (
        <div
          id = {props.id}
          onScroll = {props.onScroll}
          className={`${styles.childrenContainer}${
            props.classNames?.childrenContainer ? " " + props.classNames.childrenContainer : ""}`
          }
          style={props.style?.childrenContainer}
        >
          {props.children.lenght > 1
            ? props.children.map((child: any) => <>{child}</>)
            : props.children}
        </div>
      )}
      
      {props.customFooter && props.customFooter}
    </div>
  );
}

export default Card;
