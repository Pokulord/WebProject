import React from "react";
import style from './Register.module.css';

function Register() {

    return (
        <section className={style.container}>
            <form className={style.form}>
                <span className={style.title}>Регистрация</span>
                <div className={style.field}>
                    <span className={style.label}>Имя</span>
                    <input className={style.input}
                        type="text"
                        name="name"
                        placeholder="Имя"
                        required
                    />
                </div>

                <div className={style.field}>
                    <span className={style.label}>Email</span>
                    <input className={style.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                    />
                </div>

                <div className={style.field}>
                    <span className={style.label}>Пароль</span>
                    <input className={style.input}
                        type="password"
                        name="password"
                        placeholder="Пароль"
                        required
                        minLength="6"
                    />
                </div>

                <div className={style.checkbox}>
                    <input className={style.check}
                        type="checkbox"
                        name="agreed"
                        required
                    />
                    <span>Я согласен с условиями и политикой</span>
                </div>
                <button type="submit" className={style.button}>Регистрация</button>
                <span className={style.text}>У вас есть аккаунт?<span className={style.color}>Войти</span></span>
            </form>
        </section>
    );
}

export default Register;