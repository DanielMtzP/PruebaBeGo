import React, { useState, useEffect, useRef } from 'react';
import './Styles/pickupData.css';
import rowUp from '../../assets/rowUp.svg'
import rowDown from '../../assets/rowDown.svg'
import {getTimeFromTimestamp, formatDateStyled} from '../../Utils/DateConverter'

const DropoffData = ({orders, actionTriggered}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const detailsRef = useRef(null); 

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (!isExpanded && detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const date = orders?.destinations[1].startDate

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
        <h3>Dropoff Data</h3>
        <img src={isExpanded ? rowUp : rowDown} alt='row'/>
      </div>
      {isExpanded && (
        <div className="pickup-details" ref={detailsRef}>
          <p>{orders?.destinations[1].address}</p>
          <p>
            {formatDateStyled(date)} <span>•</span> {getTimeFromTimestamp(date)}
          </p>
          <p>{orders?.destinations[1].contact_info.telephone}</p>
          <p>{orders?.destinations[1].contact_info.email}</p>
        </div>
      )}
    </div>
  );
};

export default DropoffData;