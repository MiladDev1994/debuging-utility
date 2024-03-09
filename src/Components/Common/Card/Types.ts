import { CSSProperties, ReactNode } from "react";

export type CardTypes = {
  title?: string;
  titleChildren?: any;
  titleCustomClick?: () => void;
  titleHasBackBtn?: boolean;
  id?: string;
  customHeader?: ReactNode;
  customFooter?: ReactNode;
  onScroll?: () => void;
  children?: any;
  classNames?: {
    container?: string,
    title?: string,
    childrenContainer?: string
  }
  style?: {
    container?: CSSProperties,
    title?: CSSProperties,
    childrenContainer?: CSSProperties,
  },
};

export type CardTabType = {
  cardTabInfo?: any[]; //FIXME: object[]: id + label + url? + body?
  onTabNav?: (value: number) => void;
  rtl?: boolean;
  activeTabNav?: any;
  setActiveTabNav?: any;

  classNames?: {
    activeTabClassName?: string,
    deActiveTabClassName?: string,
    tabClassName?: string,
    cardTabBottom?: string,
    containerClassName?: string,
  };
  style?: {
    activeTabStyle?: CSSProperties,
    deActiveTabStyle?: CSSProperties,
    tabStyle?: CSSProperties,
    cardTabBottom?: CSSProperties,
    containerStyle?: CSSProperties,
  };

};

export const CardTabDefaultProps: CardTabType = {
  cardTabInfo: [],
  onTabNav: console.log,
};

export type CardTabNavType = {
  label?: string;
  index: number;
  handlClick?: (value: number) => void;
  classNames?: string;
  style?: CSSProperties;
};

export const CardTabNavDefaultProps: CardTabNavType = {
  index: 0,
  handlClick: console.log,
};
