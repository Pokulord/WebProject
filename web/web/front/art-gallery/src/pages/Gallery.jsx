import React from "react";
import bgImg from '../img/bgimg.png';
import style from './Gallery.module.css';
import gall1 from '../img/gall1.png'
import gall2 from '../img/gall2.png'
import gall3 from '../img/gall3.png'
import gall4 from '../img/gall4.png'
import gall5 from '../img/gall5.png'
import card1 from '../img/card1.png'
import card2 from '../img/card2.png'
import card3 from '../img/card3.png'
import card4 from '../img/card4.png'
import card5 from '../img/card5.png'
import card6 from '../img/card6.png'
import card7 from '../img/card7.png'
import card8 from '../img/card8.png'
import card9 from '../img/card9.png'
import card10 from '../img/card10.png'
import { useState, useRef, useEffect } from 'react';
import Card from "./Card";


function Gallery() {
    const [data, setData] = useState([]);
    const [readydata, setReady] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const API_URLS = ['http://127.0.0.1:8000/api/pics/ready/discount',
        'http://127.0.0.1:8000/api/pics/ready/'
    ];

    const token = localStorage.getItem("accessToken");

    const fetchData = async () => {
        try {
            const [response1,response2] = await Promise.all(API_URLS.map(url => fetch(url)));

            if (!response1.ok) {
                throw new Error(`HTTP err! Status : ${response.status}`);
            }

            const json1 = await response1.json();
            const json2 = await response2.json();
            console.log("Данные 1");
            console.log(json1);
            setData(json1);
            setReady(json2);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); 
    }, []);

    useEffect(() => {
        console.log('data changed', data);
    }, [data]);

    if (loading) return <div>Загрузка!</div>;
    if (error) return <div>Ошибка! : {error}</div>;
    return (
        <section>
            <div
                className={style.hero}
                style={{ backgroundImage: `url(${bgImg})` }}>
                <div className={style.overlay}>
                    <span className={style.title}>Откройте для себя современные живописные произведения</span>
                    <div className={style.description}>
                        <span>
                            В современном искусстве художники выражают свою индивидуальность через разнообразные материалы: холст, бумагу, дерево, металл. Они применяют как традиционные техники (масляные и акварельные краски), так и современные (аэрозольные краски, смешанные техники).
                        </span>
                        <span>Эти произведения искусства выходят за пределы традиционных техник, заставляя зрителей задуматься о сущности искусства. Художники играют с формами, цветами и текстурами, создавая визуально привлекательные и эмоционально насыщенные работы.</span>
                        <span>Современные произведения предлагают широкий выбор стилей и тем для исследования, независимо от предпочтений зрителя.</span>
                    </div>
                    <div className={style.stats}>
                        <div>
                            <p>200+</p>
                            <span>Аукционных домов</span>
                        </div>
                        <div>
                            <p>2,000+</p>
                            <span>Эксклюзивных произведений искусства</span>
                        </div>
                        <div>
                            <p>30,000+</p>
                            <span>Довольных клиентов</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={style.logoSection}>
                <img src={gall1} alt="Sotheby's" />
                <img src={gall2} alt="Christie's" />
                <img src={gall3} alt="Phillips" />
                <img src={gall4} alt="Gagosian" />
                <img src={gall5} alt="Pace" />
            </div>
            <div className={style.contentCard}>
                <span className={style.title_1}>Акции</span>
                <div className={style.Card}>
                    {data.map((item) => (
                        <div key={item.Pic_ID} className={style.Card}>
                            <Card
                                id = {item.Pic_ID}
                                img={item.Pic_image}
                                author={item.pic_au_name}
                                name={item.Pic_name}
                                slug={item.Pic_slug}
                                discount={item.Pic_discount}
                                final_price={item.final_price}
                                orig_price={item.Pic_price}
                                forsell
                                how_many={item.How_many}
                                token = {token} />
                        </div>
                    ))}
                </div>
                <span className={style.title_1} style={{ paddingTop: '40px' }}>Наши товары</span>
                <div className={style.Card}>
                    {readydata.map((item) => (
                        <div key={item.Pic_ID} className={style.Card}>
                            <Card
                                id = {item.Pic_ID}
                                img={item.Pic_image}
                                author={item.pic_au_name}
                                name={item.Pic_name}
                                slug={item.Pic_slug}
                                discount={item.Pic_discount}
                                final_price={item.final_price}
                                orig_price={item.Pic_price}
                                how_many = {item.How_many}
                                forsell />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Gallery;