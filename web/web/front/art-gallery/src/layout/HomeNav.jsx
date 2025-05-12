import React, { useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import style from './HomeNav.module.css';
import vector from '../svg/Vector.svg';
import search from '../svg/Search.svg';


function HomeNav() {
    return (
        <header className={style.header}>
            <nav>
                <div className={style.link}>
                    <div className={style.link_item}>
                        <Link to="/"><img className={style.logo} src={logo} alt="logo" /></Link>
                    </div>
                    <div className={style.link_text}>
                        <Link to="/">Главная</Link>
                        <Link to="/gallery">Галерея</Link>
                        <Link to="/support">Поддержка</Link>
                    </div>
                    <div className={style.link_button}>
                        <div className={style.search_cont}>
                            <input type="text" className={style.search} placeholder="Search..." />
                            <img className={style.search_ico} src={search} />
                        </div>
                        <Link to="/login"><img className={style.svg} src={vector} /></Link>
                        <Link to="/register"><button className={style.btn}>Регистрация</button></Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HomeNav;