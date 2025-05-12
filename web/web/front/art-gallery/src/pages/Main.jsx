import React from "react";
import { Link } from 'react-router-dom';
import style from './Main.module.css';
import logo from '../img/mainlogo.png';
import Card from "./Card";
import card11 from '../img/card11.png'
import card12 from '../img/card12.png'
import card13 from '../img/card13.png'
import mainend from '../img/mainend.png';
import { useState, useEffect } from 'react';


function Main() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [usename, setUsername] = useState("");
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/pics/the-most-sell')

                if (!response.ok) {
                    throw new Error(`HTTP err! Status ${err}`);
                }

                const jsonData = await response.json();
                setData(jsonData);

            } catch (err) {
                setError(err.message);
            }
            finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) return <div>Загрузка!</div>
    if (error) return <div>Ошибка {error}</div>
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
                {data.map((item) => (
                    <Card
                        key={item.Pic_ID}
                        img={"http://localhost:8000" + item.Pic_image}
                        author={item.pic_au_name}
                        name={item.Pic_name}
                        slug={item.Pic_slug}
                        discount={item.Pic_discount}
                        final_price={item.final_price}
                        orig_price={item.Pic_price} />
                ))}
            </div>
            <div className={style.regContent}>
                <span style={{ fontSize: '30px', color: '#FFFFFF' }}>Кратчайший путь к искусству</span>
                <span style={{ fontSize: '16px', color: '#FFFFFF' }}>Вдохните Жизнь В Свой Дом – Вас Ждут Шедевры</span>
                <Link to="/register" className={style.button}>Регистрация</Link>
            </div>
            <img className={style.imgEnd} src={mainend} alt="mainend" />
        </section>
    );
}

export default Main;