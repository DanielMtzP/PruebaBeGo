import React, { useEffect, useState } from 'react'
import line from '../../assets/line.png'
import g2355 from '../../assets/g2355.svg'
import Button3 from '../../assets/Button-3.png'
import Button4 from '../../assets/Button-4.png'
import Ellipse4 from '../../assets/Ellipse 4.svg'
import Ellipse9 from '../../assets/Ellipse 9.svg'
import Ellipse2 from '../../assets/Ellipse 2.svg'
import Ellipse3 from '../../assets/Ellipse 3.svg'
import './Styles/card1.css'

const Card1 = ({orders, onAction1, onAction2}) => {

    const formatAdress = (string)=>{
        const address = string;
        let parts
        let result
        if(address){
            parts = address.split(',');
            result = parts[parts.length - 2].trim();
        }
        return result
    }

    const evaluate = (forEv)=>{
        let iconDot
        if(forEv === 'En espera'){
            iconDot = Button4
        } else if(forEv === 'Aceptado'){
            iconDot = Button3
        }
        return iconDot
    }

    const openSwitch1 = ()=>{
        onAction1()
    }
    const openSwitch2 = ()=>{
        onAction2()
    }

return (
    <div className='card1'>
        <div className='card1_container'>
            <header className='card1_header'>
                <h1 className='card1_title'><span className='ref'>Referencia</span> {orders?.reference_number}</h1>
                <h1 className='card1_title2'><span className='order1'>Order</span> #{orders?.order_number} </h1>
            </header>
            <div className="general_container">
                <div className="icon_container1">
                    <div className="icon-container_camion">
                        <img className="camion circle-large" src={Ellipse9} alt="Circle Large" />
                        <img className="camion circle-center" src={Ellipse4} alt="Circle Center" />
                        <img className="camion truck-icon" src={g2355} alt="Truck Icon" />
                    </div>
                    <img src={line} alt="" />
                    <div className="icon-container_ellipse">
                        <img className="camion circle-large" src={Ellipse2} alt="Circle Large" />
                        <img className="camion circle-center" src={Ellipse3} alt="Circle Center" />
                    </div>
                </div>
                <div className='card_body'>
                    <div className='card_body_secc' onClick={openSwitch1}>
                        <span>Recolección</span>
                        <div className='card_body_sub'>
                            <span className="card1_body_sub_cd">{formatAdress(orders?.destinations[0].address)}</span>
                        </div>
                        <div className='card_body_last_adress'>
                            <div className='card1_body_last_span1'>{orders?.destinations[0].address}</div>
                        </div>
                        <div className='card_body_last'>
                            <div className='card_body_last_span1'>
                                <img className="card_body_status" src={evaluate(orders?.destinations[0].status_string)} alt="Circle Center" />
                            </div>
                        </div>
                        <div className='card_body_last'>
                            <img src={''} alt="" />
                        </div>
                    </div>
                    <div className='card_body_secc' onClick={openSwitch2}>
                        <span>Entrega</span>
                        <div className='card_body_sub'>
                            <span className="card1_body_sub_cd">{formatAdress(orders?.destinations[1].address)}</span>
                        </div>
                        <div className='card_body_last'>
                            <div className='card1_body_last_span1'>{orders?.destinations[1].address}</div>
                        </div>
                        <div className='card_body_last'>
                            <div className='card_body_last_span1'>
                                <img className="card_body_status" src={evaluate(orders?.destinations[1].status_string)} alt="Circle Center" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)
}

export default Card1