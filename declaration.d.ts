/// <reference types="react-scripts" />

declare namespace api_electron {
  function walk(data: {directory: string}): void;
  function getData(values: {id: number, type: "first" | "next" | "previous"}): void;
  function first(id?: any): void;
  function next(id?: any): void;
  function previous(id?: any): void;
  function count(): void;
  function filter(filter: any): void;
  function xmlKeyCreate(key: string): void;
  function xmlKeyRead(type: "all" | "active"): void;
  function xmlKeyUpdate(id: number): void;
  function xmlKeyUpdateAll(status: boolean): void;
  function xmlKeyDelete(id: number): void;
  function renameExe(data: any): void;
  function selectedDir(): any;
  function onDataFromIpcMain(channel:string, func: ()=>void): () => Electron.IpcRenderer;
}

declare module "*.module.css";

declare module "*.module.scss";

declare module "*.scss" {
    const css: { [className: string]: string };
    export default css;
  }
declare module "*.sass" {
  const css: { [className: string]: string };
  export default css;
}
declare interface Error {
  name: string
  message: string
  stack?: string
  code?: number | string
}

declare module "react-markup";
declare module "*.webp";
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.svg";
