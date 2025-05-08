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
    // Get_Pics_list();
    // const PicLoading = LoadingPics(Card);
    // const [picState, setPicState] = useState({
    //     loading : false,
    //     pics: null,
    // });
    const [data, setData] = useState([]);
    const [loading, setLoading]  = useState(true);
    const [error, setError] = useState(null);




    useEffect(() => {
        const fetchData = async ()=>{
           try
           {
            const response = await fetch('http://127.0.0.1:8000/api/pics/all/discount');

           if (!response.ok){
                throw new Error(`HTTP err! Status : ${error}`);
           }

           const jsonData = await response.json();
           console.log("Данные 1")
           console.log(jsonData);
           setData(jsonData);

           } catch (err) {
            setError(err.message);
           } finally {
            setLoading(false);
           }
        };

        fetchData();
    } , []);

        useEffect(() => {
        console.log('data changed', data);
    }, [data])

    if (loading) return <div>Загрузка!</div>
    if (error) return <div>Ошибка! : {error}</div>
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
                    {/* <LoadingPics/> */}
                    <Card img={card1} title="Леонардо да Винчи, «Спаситель Мира»" price={45000} items={data} />
                    {/* <Card img={card2} title="Иван Айвазовский, «Девятый вал»" price={38000} oldPrice={47500} discount={20} items={data} /> */}
                    {/* <Card img={card3} title="Иван Крамской, «Неизвестная»" price={25000} />
                    <Card img={card4} title="Алессандро Аллори, «Похищение Прозерпины»" price={8400} oldPrice={12000} discount={30}/>
                    <Card img={card5} title="Ян Вермеер, «Девушка с жемчужной серёжкой»" price={5300} /> */}
                </div>
                <span className={style.title_1}  style={{ paddingTop: '40px' }}>Хиты продаж</span>
                <div className={style.Card}>
                    {/* <Card img={card6} title="Анри Руссо, «Спящая цыганка»" price={13500} oldPrice={17000} discount={20} />
                    <Card img={card7} title="Карл Брюллов, «Девушка, собирающая виноград»" price={8400} />
                    <Card img={card8} title="Рене Магритт, «Сын человеческий»" price={40000} />
                    <Card img={card9} title="Илья Репин, «Запорожцы с Кавказа»" price={40000} />
                    <Card img={card10} title="Леонардо да Винчи, «Дама с горностаем»" price={2900} oldPrice={3500} discount={20}/> */}
                </div>
            </div>
        </section>
    );
}

export default Gallery;