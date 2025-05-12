import React, { use } from "react";
import style from './Register.module.css';
import { useState } from "react";
import axios from 'axios'

function Register() {
    const [formData, setFormData] = useState({
        username: "",
        email : "",
        password : ""
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        })
    }



    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (isLoading){
            return 
        }

        setIsLoading(true);

        try {
            const response = await axios.post("http://localhost:8000/api/user/register/", formData);
            console.log("Success!", response.data)  
            setSuccessMessage("Регистрация прошла успешно!")   
        }
        catch(error){
            console.log("Error during registration!", error.response?.data);
            if (error.response && error.response.data){
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if (errorMessages && errorMessages.length > 0)
                    {
                        setError(errorMessages[0]);
                    }
                })
            }
        }

        finally 
        {
            setIsLoading(false);
        }
    }


    return (
        <section className={style.container}>
            <form className={style.form}>
                <span className={style.title}>Регистрация</span>
                <div className={style.field}>
                    <span className={style.label}>Имя</span>
                    <input className={style.input}
                        type="text"
                        name="username"
                        placeholder="Имя"
                        required
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>

                <div className={style.field}>
                    <span className={style.label}>Email</span>
                    <input className={style.input}
                        type="email"
                        name="email"
                        placeholder="Email"
                        required
                        value={formData.email}
                        onChange={handleChange}
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
                        value={formData.password}
                        onChange={handleChange}
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
                <button type="submit" disabled = {isLoading} className={style.button} onClick={handleSubmit} >Регистрация</button>
                {error && <p style={{color: "red"}}>{error}</p>}
                {successMessage && <p style={{color : "green"}} >{successMessage}</p>}
                <span className={style.text} >У вас есть аккаунт?<span className={style.color}>Войти</span></span>
            </form>
        </section>
    );
}

export default Register;