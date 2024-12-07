import './App.css'
import CargoDetails from './views/CargoDetails'
import Upcoming from './views/Upcoming'
import { OrderProvider } from './context/OrderProvider'
import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {

  return (
    <>
    <BrowserRouter>
      <OrderProvider>
      <Routes>
        <Route  path="/" element={ <Upcoming/>}></Route>
        <Route  path="/details" element={<CargoDetails/>}></Route>
      </Routes> 
      </OrderProvider>
    </BrowserRouter>
    </>
  )
}

export default App
