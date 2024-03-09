import React from "react";

// import { useNavigate } from "react-router-dom";
import { TitleCardDefaultProps, TitleCardTypes } from "./Types";
import Icon from "../Icon/Icon";
import styles from "./TitleCard.module.scss";

const TitleCard = (props: TitleCardTypes) => {
  // const navigate = useNavigate();

  return (
    <div
      className={`${styles.container}${props.classNames?.container ? " " + props.classNames.container : ""}`}
      style={props.style?.container}
    >
      {props.title && !props.hasBackBtn && 
        <h3>
          {props.title}
        </h3>
      }

      {props.title && props.hasBackBtn && (
        <div
          className={styles.backTitleContainer}
          onClick={() => {
            if (props.customClick) {
              props.customClick()
            } else {
              // navigate(-1)
            }
          }}
        >
          <div
            className={`${styles.icon}${props.classNames?.icon ? " " + props.classNames.icon : ""}`}
            style={props.style?.icon}
          >
            <Icon
              name="arrowRight"
              color="#33313C"
              width={props.iconWidth}
              height={props.iconHeight}
            />
          </div>
          <h3>
            {props.title}
          </h3>
        </div>
      )}

      {props.children && props.children.length > 1
        ? props.children.map((child: any, index: any) => (
            <div key={`TitleCard_Child_${index}`}>
              {child}
            </div>
          ))
        : props.children
      }
    </div>
  );
}

TitleCard.defaultProps = TitleCardDefaultProps;

export default TitleCard;
