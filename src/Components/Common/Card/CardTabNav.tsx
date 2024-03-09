import React from "react";
import { CardTabNavDefaultProps, CardTabNavType } from "./Types";

const CardTabNav = (props: CardTabNavType) => {  
  return(
      <p
        className={props.classNames}
        style={props.style}
        onClick={() => {props.handlClick && props.handlClick(props.index)}}
      >
        {props.label}
      </p>
  );
}

CardTabNav.defaultProps = CardTabNavDefaultProps;

export default CardTabNav;
