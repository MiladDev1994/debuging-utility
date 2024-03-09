import React, { useEffect, useState, useRef } from "react";

import { CustomInputDefaultProps, CustomInputTypes } from "./Types";
import styles from "./CustomInput.module.scss";

const CustomInput = (props: CustomInputTypes) => {

  const inputRef = useRef<any>();
  const [inputValue, setInputValue] = useState<string | undefined>(props.value);
  
  const onChangeValue = (value: string): void => {
    if (!props.onChangeValidator || props.onChangeValidator(value)) {
      if (props.onChange) {
        props.onChange(value);
      };
      setInputValue(value);
    };
  };

  const onBlurInput = (value: string) => {
    if (props.onBlur) {
      if (props.onBlurValidator) {
        props.onBlur(value);
        props.onBlurValidator(value);
        //TODO: add hasError
      } else {
        props.onBlur(value);
      };
    };
  };

  // const onBlurInput = (value: any) => {
  //   if (props.onBlur) {
  //     if (props.onBlurValidator) {
  //       if (props.onBlurValidator(value)) props.onBlur(value);
  //       //TODO add hasError
  //     } else {
  //       props.onBlur(value);
  //     };
  //   };
  // };

  useEffect(() => {
    if (props.value !== inputValue) setInputValue(props.value);
  }, [inputValue, props.value]);

  useEffect(() => {
    if (props.resetFlag === undefined) return;
    if (props.resetFlag > 0) inputRef.current.value = "";
  }, [props.resetFlag, props.value]);

  return (
    <div
      className={`${styles.container}${props.classNames?.container ? " " + props.classNames.container : ""}`}
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

      <div className={`${styles.inputContainer}${props.classNames?.inputContainer ? " " + props.classNames.inputContainer : ""}`}>
        <input
          data-cy={props.cyName}
          cy-id={props.cyId}
          // name={props.name}
          ref={inputRef}
          className={`${styles.input}${props.classNames?.input ? " " + props.classNames.input : ""}`}
          value={inputValue}
          // type={props.fieldType}
          // disabled={props.isDisable}
          // placeholder={props.placeHolder}
          onChange={(event) => onChangeValue(event.target.value)}
          onBlur={(event) => onBlurInput(event.target.value)}
          // minLength={props.minLength}
          // maxLength={props.maxLength}
          // min={props.min}
          // max={props.max}
          // step={props.step}
          style={props.style?.input}
          {...props.inputProps}
        />

        <div className={styles.inputChild}>
          {props.customChildren}
        </div>
      </div>
    </div>
  );
}

CustomInput.defaultProps = CustomInputDefaultProps;

export default CustomInput;