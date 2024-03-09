import { CSSProperties, HTMLAttributes, ReactNode } from "react";

export type CustomInputTypes = {
  // test
  cyName?: string;
  cyId?: string;

  // logic
  // name?: string;
  label?: string;
  value?: string;
  // isRtl?: boolean;
  // fieldType?: string;
  // isDisable?: boolean;
  isRequired?: boolean;
  // placeHolder?: string;
  customChildren?: ReactNode;
  onChange?: (value: string) => void;
  onChangeValidator?: (value: string) => boolean;
  onBlur?: (value: string) => void;
  onBlurValidator?: (value: string) => boolean;
  // minLength?: number;
  // maxLength?: number;
  // min?: string | number;
  // max?: string | number;
  // step?: string | number;
  classNames?: {
    container?: string,
    label?: string,
    inputContainer?: string,
    input?: string
  };
  style?: {
    container?: CSSProperties,
    label?: CSSProperties,
    input?: CSSProperties
  };
  resetFlag?: number;
  inputProps?: HTMLAttributes<HTMLInputElement>;
};

export const CustomInputDefaultProps: CustomInputTypes = {
// value: "",
// isRtl: false,
// fieldType: "text",
// isDisable: false,
resetFlag: 0
};

export type TextereaTypes = {
  label?: string;
  value?: string;
  placeHolder?: string;
  isRequired?: boolean;
  onChange?: (value: string) => void;
  onChangeValidator?: (value: string) => boolean;
  onBlur?: (value: string) => void;
  onBlurValidator?: (value: string) => boolean;
  maxLength?: number;
  minLength?: number;
  classNames?: {
    container?: string,
    label?: string,
    input?: string
  };
  style?: {
    container?: CSSProperties,
    label?: CSSProperties,
    input?: CSSProperties
  };
};

