import React from "react";
import logo from '../img/logo.png';
import style from './End.module.css';


function End() {
    return(
        <section className={style.section}>
            <div className={style.div}>
                <img className={style.logo} src={logo} alt="logo" />
                <span>Что-то важное © 2025 Еще более важное | Ну и еще что-то</span>
            </div>
        </section>
    );
}

export default End;