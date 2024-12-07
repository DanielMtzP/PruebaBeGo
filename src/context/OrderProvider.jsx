import React, { createContext, useState} from "react";

const OrderContext = createContext();
const OrderProvider = ({ children }) => {
    const [orderInf, setOrderInf] = useState(null)
    return (
        <OrderContext.Provider value={{orderInf, setOrderInf}}>
          {children}
        </OrderContext.Provider>
      )
}

export { OrderProvider };
export default OrderContext;