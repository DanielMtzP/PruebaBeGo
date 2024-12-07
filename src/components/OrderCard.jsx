import React, { useState, useEffect, useRef } from "react";
import Group26 from "../assets/Group26.png";
import g1153 from "../assets/g1153.png";
import Ellipse from "../assets/Ellipse 1.png";
import Ellipse2 from "../assets/Ellipse2.png";
import eye from "../assets/eye.svg";
import line from "../assets/line.png";
import location from "../assets/location.png";
import camion from "../assets/camion.png";
import "./Styles/orderCard.css";
import useCargoinfo from "../hooks/useCargoinfo.js";
import { useNavigate } from "react-router-dom";
import { formatDate, getTimeFromTimestamp } from "../Utils/DateConverter.js";

const OrderCard = ({ data }) => {
  const { setOrderInf } = useCargoinfo();
  const navigate = useNavigate();
  const [startTrack, setStartTrack] = useState(false);

  let icon;

  if (data.type === "FCL") {
    icon = Group26;
  } else if (data.type === "FTL") {
    icon = g1153;
  }

  let icon2;

  if (data.status_class === "blue-dot-bg") {
    icon2 = Ellipse;
  } else if (data.status_class === "grey-dot-bg") {
    icon2 = Ellipse2;
  }

  const formatAdress = (string) => {
    const address = string;
    let parts;
    let result;
    if (address) {
      parts = address.split(",");
      result = parts[parts.length - 2].trim();
    }
    return result;
  };

  const targetDate = new Date(data.start_date).getTime();

  const [countdown, setCountdown] = useState(() => {
    const now = Date.now();
    const remainingTime = Math.floor((targetDate - now) / 1000);
    return Math.max(remainingTime, 0);
  });
  const timerId = useRef();

  useEffect(() => {
    if (countdown > 0) {
      timerId.current = setInterval(() => {
        setCountdown((prev) => Math.max(prev - 1, 0));
      }, 1000);
    }
    return () => clearInterval(timerId.current);
  }, [countdown]);

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      console.log("Navegar");
      setStartTrack(true);
    }
  }, [countdown]);

  const formatTime = (time) => {
    const totalSeconds = Math.floor(time);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const fillData = () => {
    setOrderInf(data);
    navigate("/details");
  };

  return (
    <div className="card">
      <h1 className="card_title">
        <span className="order">Order</span> #{data.order_number}{" "}
      </h1>
      <div className="card_container">
        <header className="card_header">
          <div className="card_header_left">
            <img src={icon} alt="icon fcl" />
            <span>{data.type}</span>
          </div>
          <div className="card_header_rigth">
            <img src={icon2} alt="status" />
            <span>{data.status_string}</span>
          </div>
        </header>
        <div className="general_container">
          <div className="icon_container">
            <img src={camion} alt="" />
            <img src={line} alt="" />
            <img src={location} alt="" />
          </div>
          <div className="card_body">
            <div className="card_body_secc">
              <span>{data.destinations[0].nickname}</span>
              <div className="card_body_sub">
                <span className="card_body_sub_cd">
                  {formatAdress(data.destinations[0].address)}
                </span>
                <span className="card_body_sub_date">
                  {formatDate(data.destinations[0].start_date)}
                </span>
              </div>
              <div className="card_body_last">
                <div className="card_body_last_span1">
                  {data.destinations[0].address}
                </div>
                <span className="card_body_last_span2">
                  {getTimeFromTimestamp(data.destinations[0].start_date)}
                </span>
              </div>
            </div>
            <div className="card_body_secc">
              <span>{data.destinations[1].nickname}</span>
              <div className="card_body_sub">
                <span className="card_body_sub_cd">
                  {formatAdress(data.destinations[1].address)}
                </span>
                <span className="card_body_sub_date">
                  {formatDate(data.destinations[1].end_date)}
                </span>
              </div>
              <div className="card_body_last">
                <div className="card_body_last_span1">
                  {data.destinations[1].address}
                </div>
                <span className="card_body_last_span2">
                  {getTimeFromTimestamp(data.destinations[1].end_date)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <footer className="card_footer">
          {startTrack ? (
            <button className="card_footer_button1">
              Its time for pickup
            </button>
          ) : (
            <button className="card_footer_button">
              Start pickup in<span>{formatTime(countdown)}</span>
            </button>
          )}
          <button className="card_footer_button2" onClick={fillData}>
            Resume <img src={eye} alt="eye" />
          </button>
        </footer>
      </div>
    </div>
  );
};

export default OrderCard;
