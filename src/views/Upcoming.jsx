import React, { useEffect, useState } from 'react';
import './Styles/upcoming.css';
import rowLeft from '../assets/rowleft.png';
import Notification from '../assets/Notification.png';
import search from '../assets/search.png';
import { getUpcomingOrders } from '../Utils/Fetch';
import OrderCard from '../components/OrderCard';

const Upcoming = () => {
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const upcoming = await getUpcomingOrders();
        setUpcomingOrders(upcoming.result);
      } catch (err) {
        console.log(err.message);
      }
    };
    fetchData();
  }, []);

  const filteredOrders = upcomingOrders.filter(order => {
    if (!searchTerm.trim()) {
      return true;
    }
    return (
      order.order_number &&
      order.order_number.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  return (
    <div>
      <header>
        <img className='rowleft' src={rowLeft} alt="Row Left" />
        <h1>Cargo Orders</h1>
        <img className='notification' src={Notification} alt="Notification" />
      </header>
      <section>
        <p className='active'>Upcoming</p>
        <p>Completed</p>
        <p>Past</p>
      </section>
      <div className='search_container'>
        <img className='search' src={search} alt="Search" />
        <input 
          placeholder='Search...' 
          type="text" 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <div className='container_Cards'>
        {filteredOrders.length > 0 ? (
          filteredOrders.map(upcomingOrder => (
            <OrderCard key={upcomingOrder._id} data={upcomingOrder} />
          ))
        ) : (
          'No hay órdenes próximas a llegar'
        )}
      </div>
    </div>
  );
};

export default Upcoming;
