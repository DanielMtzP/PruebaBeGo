import React, { useEffect, useState } from 'react';
import './Styles/upcoming.css'
import rowLeft from '../assets/rowleft.png';
import Notification from '../assets/Notification.png'
import Card1 from '../components/Details/Card1';
import useCargoinfo from '../hooks/useCargoinfo.js'
import { useNavigate } from 'react-router-dom';
import Card2 from '../components/Details/Card2.jsx';
import PickupData from '../components/Details/PickupData.jsx';
import { getOrders } from '../Utils/Fetch.js';
import DropoffData from '../components/Details/DropoffData.jsx';

const CargoDetails = () => {

  const [orders, setOrders] = useState()
  const navigate = useNavigate();
  const [openSwitch1, setOpenSwitch1] = useState(false);
  const [openSwitch2, setOpenSwitch2] = useState(false);

    // Aquí se guarda globalmente la información envíada por cada componente
    // (el que se seleccione para ver los detalles) en caso de la API contuviera toda la información 
    // ya lista para renderizarse, esta informació se guarda en el localstorage para que no se pierda en 
    // dado caso que la página se re-renderice ya dentro del componente
    const { orderInf } = useCargoinfo()
    
    // Como la información a renderizar es de un solo componente se procede a 
    // realizar la petición de la unica orden existente en la API para renderizarla, 
    // ahora usamos .then y .catch en lugar de async/await

    useEffect(() => {
      getOrders()
        .then((coming) => {
          setOrders(coming.result);
          console.log(coming.result, 'ALL');
        })
        .catch((err) => {
          console.log(err.message);
        });
  }, []);

  const goHome = ()=>{
    navigate('/')
  }

  const handleAction1 = () => {
    setOpenSwitch1(prev => !prev);
  };
  const handleAction2 = () => {
    setOpenSwitch2(prev => !prev);
  };

  return (
    <div>
      <header>
        <button className='button' onClick={goHome}>
          <img src={rowLeft} alt="Row Left" />
        </button>
        <h1>Cargo Details</h1>
        <img className='notification' src={Notification} alt="Notification" />
      </header>
      <div className='container_Cards'>
        <Card1 orders={orders} onAction1={handleAction1} onAction2={handleAction2}/>
        <Card2 orders={orders}/>
        <PickupData orders={orders} actionTriggered={openSwitch1}/>
        <DropoffData orders={orders} actionTriggered={openSwitch2}/>
      </div>
    </div>
  )
}

export default CargoDetails