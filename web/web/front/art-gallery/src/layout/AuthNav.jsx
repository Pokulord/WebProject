import React from "react";
import { Link } from 'react-router-dom';
import logo from '../img/logo.png';
import style from './AuthNav.module.css';
import vector from '../svg/Vector.svg';
import search from '../svg/Search.svg';
import axios from "axios";
import { useState, useEffect } from "react";
import { ReactComponent as ArrowIcon } from '../svg/arr.svg';
import cart_icon from '../svg/Vector.png';
import CartTab from "./CartTab";


function AuthNav({ username }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const [cartOpen, setCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([])

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 768);
            if (window.innerWidth >= 768) setMenuOpen(false);
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);


    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart)
        {
            setCartItems(JSON.parse(storedCart));
        }
    }, [])

    const handleLogout = async () => {
        try {
            const refreshToken = localStorage.getItem("refreshToken");
            console.log("Token" , refreshToken)
            if (refreshToken) {
                const token = localStorage.getItem("accessToken");
                await axios.post("http://localhost:8000/api/user/logout/", { "refresh": refreshToken }, {headers : {"Authorization": `Bearer ${token}`}})
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem('cart');
                window.location.assign("http://localhost:3000/")
            }
        }
        catch (error) {
            console.log("Ошибка при деавторизации!", error)
        }
    }
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
                            <img className={style.search_ico} src={search} />
                        </div>
                        <Link to="/login"><img className={style.svg} src={vector} /></Link>
                        <span className={style.username}>{username}</span>
                        <button style={{background : "transparent" , border : "none"}} onClick={() => setCartOpen(!cartOpen)}>
                            <img src={cart_icon} className={style.svg} alt="" />
                        </button>
                        <button onClick={handleLogout} className={style.logout}>Выйти</button>
                    </div>
                </div>
            </nav>
            {cartOpen && <CartTab items={cartItems} onClose={() =>  setCartOpen(false)} />}
        </header>
    );
}

export default AuthNav;