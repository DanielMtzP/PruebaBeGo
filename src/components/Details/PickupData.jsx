import React, { useState, useEffect, useRef } from 'react';
import './Styles/pickupData.css';
import rowUp from '../../assets/rowUp.svg'
import rowDown from '../../assets/rowDown.svg'
import {getTimeFromTimestamp, formatDateStyled} from '../../Utils/DateConverter'

const PickupData = ({orders, actionTriggered}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef(null); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const date = orders?.destinations[0].startDate

  useEffect(() => {
    if (actionTriggered) {
      setIsExpanded(true);
      if (detailsRef.current) {
        setTimeout(() => {
          detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [actionTriggered]);
  

  return (
    <div className="pickup-container" onClick={toggleExpand}>
      <div className='pickup-header'>
        <h3>Pickup Data</h3>
        <img src={isExpanded ? rowUp : rowDown} alt='row'/>
      </div>
      {isExpanded && (
        <div className="pickup-details" ref={detailsRef}>
          <p>{orders?.destinations[0].address}</p>
          <p>
            {formatDateStyled(date)} <span>•</span> {getTimeFromTimestamp(date)}
          </p>
          <p>{orders?.destinations[0].contact_info.telephone}</p>
          <p>{orders?.destinations[0].contact_info.email}</p>
        </div>
      )}
    </div>
  );
};

export default PickupData;
