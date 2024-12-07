import React, { useEffect, useState } from "react";
import "./Styles/card2.css";
import Group32 from "../../assets/Group 32.svg";
import Group31 from "../../assets/Group 31.svg";
import Group5 from "../../assets/Group 5.svg";
import Group55 from "../../assets/Group 55.svg";
import { getTimeFromTimestampStyled } from '../../Utils/DateConverter'
import man from '../../assets/man.png'

const Card2 = ({ orders }) => {

  const [disabled, setDisabled] = useState(true)

  let result1;
  let result2;
  let result3;
  let result4;

  //Aqui se evalua el status de la orden para poder renderizar el icono correspondiente como se pidió en las instrucciones

  const resultsMapping = [
    [Group5, Group55, Group55, Group55],
    [Group31, Group55, Group55, Group55],
    [Group31, Group32, Group55, Group55],
    [Group31, Group32, Group32, Group55],
    [Group31, Group32, Group32, Group32],
  ];
  let activeCount = Array.isArray(orders?.status_list?.pickup)
    ? orders.status_list.pickup.reduce(
        (count, pickup, index) =>
          pickup.active && count === index ? count + 1 : count,
        0
      )
    : 0;
  [result1, result2, result3, result4] = resultsMapping[activeCount];

  function getFirstWord(str) {
    const words = str?.trim().split(/\s+/);
    return words?.[0] || "";
  }

  //Botón dinámico 
  useEffect(() => {
    if(orders?.status_list.pickup[2].active){
      setDisabled(false)
      console.log("Track Order")
    }
  }, [orders])

  const hello = ()=>{
    console.log('Track Order')
  }
  

  return (
    <div className="card2">
      <div className="track-order-container">
        <div className="user-profile">
          <img src={man} alt="User Profile" />
        </div>
        <h2 className="order-time">{getTimeFromTimestampStyled(orders?.start_date)}</h2>
        <div className="timeline">
          <div className="timeline-item">
            <img src={result1} alt="" />
            <p>Created Order</p>
          </div>
          <div className="timeline-item">
            <img src={result2} alt="" />
            <div className="p">
              <p>Accepted Order</p>
            </div>
          </div>
          <div className="timeline-item">
            <img src={result3} alt="" />
            <div className="p">
              <p className="inactive">
                Pickup set up by {getFirstWord(orders?.driver.nickname)}
              </p>
            </div>
          </div>
          <div className="timeline-item">
            <img src={result4} alt="" />
            <div className="p">
              <p className="inactive">Pickup Completed</p>
            </div>
          </div>
        </div>
      </div>
      <button disabled={disabled} onClick={hello} className={disabled? "disables-button" : "track-order-button"}>Track Order</button>
    </div>
  );
};

export default Card2;
