import  { useEffect } from "react";

export const UseOnDataFromIpcMain = (channel, listener, deps=[]) => {
    useEffect(() => {
      if (listener) {
        // eslint-disable-next-line no-undef 
        //TODO remove this
        const removeListener = window.api_electron.onDataFromIpcMain(
            channel, listener);
        return () => {
          if (removeListener) removeListener();
        };
      }
    }, [deps]);
  };
