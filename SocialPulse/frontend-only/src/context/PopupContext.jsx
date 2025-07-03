import React, { createContext, useContext, useState, useCallback } from "react";
import Popup from "../components/Popup"; 

const PopupContext = createContext();

export const usePopup = () => useContext(PopupContext);

export const PopupProvider = ({ children }) => {
  const [popup, setPopup] = useState(null);

  const showpopup = useCallback((message, type = "success") => {
    setPopup({ message, type });
  }, []);

  const hidePopup = () => setPopup(null);

  return (
    <PopupContext.Provider value={{ showpopup }}>
      {children}
      {popup && (
        <Popup
          message={popup.message}
          type={popup.type}
          onClose={hidePopup}
        />
      )}
    </PopupContext.Provider>
  );
};
