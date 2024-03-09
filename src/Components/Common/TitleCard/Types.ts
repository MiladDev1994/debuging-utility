import { CSSProperties } from "react";

export type TitleCardTypes = {
  title?: string;
  children?: any;
  customClick?: () => void;
  hasBackBtn?: boolean;
  iconHeight?: string | number;
  iconWidth?: string | number;
  classNames?: {
    container?: string;
    icon?: string;
  };
  style?: {
    container?: CSSProperties;
    icon?: CSSProperties;
  };
};

export const TitleCardDefaultProps: TitleCardTypes = {
  hasBackBtn: false,
  // customClick: undefined,
};