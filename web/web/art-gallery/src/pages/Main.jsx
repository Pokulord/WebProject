import React from "react";
import { Link } from 'react-router-dom';
import style from './Main.module.css';
import logo from '../img/mainlogo.png';
import Card from "./Card";
import card11 from '../img/card11.png'
import card12 from '../img/card12.png'
import card13 from '../img/card13.png'
import mainend from '../img/mainend.png'


function Main() {
    return (
        <section className={style.Content}>
            <div className={style.main} style={{ backgroundImage: `url(${logo})` }}>
                <span className={style.title}>Откройте для себя сокровища искусства, созвучные вашему вкусу</span>
                <span className={style.text}>Начать исследование</span>
            </div>
            <div className={style.cardContent}>
                <div className={style.textContent}>
                    <span style={{ fontSize: '22px', color: '#FFFFFF' }}>Самые продаваемые картины</span>
                    <span style={{ fontSize: '16px', color: '#786060' }}>Самый простой способ жить более вдохновенно — окружить себя искусством, которое вас трогает</span>
                    <Link to="/gallery" className={style.btn}>Галерея</Link>
                </div>
                <Card img={card11} title="Американская готика" price={22200} imgheight = '250px' />
                <Card img={card12} title="Девочка с персиками" price={11900} imgheight = '250px'/>
                <Card img={card13} title="Поцелуй" price={13000} imgheight = '250px'/>
            </div>
            <div className={style.regContent}>
                <span style={{ fontSize: '30px', color: '#FFFFFF' }}>Кратчайший путь к искусству</span>
                <span style={{ fontSize: '16px', color: '#FFFFFF' }}>Вдохните Жизнь В Свой Дом – Вас Ждут Шедевры</span>
                <Link to="/register" className={style.button}>Регистрация</Link>
            </div>
            <img className={style.imgEnd}src={mainend} alt="mainend"/>
        </section>
    );
}

export default Main;