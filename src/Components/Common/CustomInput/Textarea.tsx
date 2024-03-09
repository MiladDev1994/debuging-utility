import React from "react";
import { TextereaTypes } from "./Types";
import styles from "./CustomInput.module.scss";


const Textarea = (props: TextereaTypes) => {
  const onChangeValue = (value: string) => {
    if (!props.onChangeValidator || props.onChangeValidator(value)) {
      props.onChange && props.onChange(value);
      // setInputValue(value);
    }
  };

  const onBlurInput = (value: string) => {
    if (props.onBlur) {
      if (props.onBlurValidator) {
        props.onBlur(value);
        props.onBlurValidator(value);
      } else {
        props.onBlur(value);
      }
    }
  };

  return (
    <div
      className={`${styles.Container}${props.classNames?.container ? " " + props.classNames.container : ""}`}
      style={props.style?.container}
    >
      {props.label && (
        <div
          className={`${styles.label}${props.classNames?.label ? " " + props.classNames.label : ""}`}
          style={props.style?.label}
        >
          <p className={props.isRequired ? styles.labelRequired : ""}>
            {props.label}
          </p>
        </div>
      )}
      
      <textarea
        className={`${styles.input}${props.classNames?.input ? " " + props.classNames.input : ""}`}
        rows={5}
        placeholder={props.placeHolder}
        onChange={(e) => onChangeValue(e.target.value)}
        onBlur={(e) => onBlurInput(e.target.value)}
        minLength={props.minLength ? props.minLength : -1}
        maxLength={props.maxLength ? props.maxLength : -1}
        value={props.value !== null ? props.value : ""}
        style={props.style?.input}
      ></textarea>
    </div>
  );
};

export default Textarea;
