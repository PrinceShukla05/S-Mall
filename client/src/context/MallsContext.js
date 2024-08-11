import React, { useState, createContext } from "react";

export const MallsContext = createContext();

export const MallsContextProvider = (props) => {
  const [malls, setMalls] = useState([]);
  const [selectedMall, setSelectedMall] = useState(null);
  const addMalls = (mall) => {
    
  setMalls([...malls, mall]);
  };
  return (
    <MallsContext.Provider
      value={{
        malls,
        setMalls,
        addMalls,
        selectedMall,
        setSelectedMall,
      }}
    >
      {props.children}
    </MallsContext.Provider>
  );
};