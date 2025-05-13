import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import style from './HomeNav.module.css';
import vector from '../svg/Vector.svg';
import search from '../svg/Search.svg';
import { ReactComponent as ArrowIcon } from '../svg/arr.svg';


function HomeNav() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <header className={style.header}>
            <nav>
                <div className={style.link}>
                    <div className={style.link_item}>
                        <Link to="/"><img className={style.logo} src={logo} alt="logo" /></Link>
                    </div>

                    {!isMobile && (
                        <div className={style.link_text}>
                            <Link to="/">Главная</Link>
                            <Link to="/gallery">Галерея</Link>
                            <Link to="/support">Поддержка</Link>
                        </div>
                    )}
                    {isMobile && (
                        <div className={style.burger_wrapper}>
                            <span className={style.burger} onClick={() => setMenuOpen(!menuOpen)}>
                                <ArrowIcon className={`${style.arrow_icon} ${menuOpen ? style.arrow_open : ''}`} />
                            </span>
                            <div className={`${style.mobile_menu} ${menuOpen ? style.open : ''}`}>
                                <Link to="/" onClick={() => setMenuOpen(false)}>Главная</Link>
                                <Link to="/gallery" onClick={() => setMenuOpen(false)}>Галерея</Link>
                                <Link to="/support" onClick={() => setMenuOpen(false)}>Поддержка</Link>
                            </div>
                        </div>
                    )}

                    <div className={style.link_button}>
                        <div className={style.search_cont}>
                            <input type="text" className={style.search} placeholder="Search..." />
                            <img className={style.search_ico} src={search} alt="search icon" />
                        </div>
                        <Link to="/login"><img className={style.svg} src={vector} alt="login" /></Link>
                        <Link to="/register"><button className={style.btn}>Регистрация</button></Link>
                    </div>
                </div>
            </nav>
        </header>
    );
}

export default HomeNav;