import { useState } from "react";

const useCargoinfo = () => {
  const [orderInf, setOrderInfState] = useState(() => {
    
    const savedData = localStorage.getItem("orderInf");
    return savedData ? JSON.parse(savedData) : null;
  });

  const setOrderInf = (data) => {
    
    setOrderInfState(data);
    localStorage.setItem("orderInf", JSON.stringify(data));
  };

  return { orderInf, setOrderInf };
};

export default useCargoinfo;
