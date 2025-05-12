import React from 'react'
import { useState } from 'react';
import style from './Register.module.css';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState(
        {
            email: "",
            password: ""
        }

    )

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
        if (isLoading) {
            return
        }

        setIsLoading(true);

        try {
            console.log(formData)
            const response = await axios.post("http://localhost:8000/api/user/login/", formData);
            console.log("Success!", response.data)
            setSuccessMessage("Успешный вход!")
            localStorage.setItem("accessToken" , response.data.tokens.access);
            localStorage.setItem("refreshToken", response.data.tokens.refresh);
            location.reload();
        }
        catch (error) {
            console.log("Ошибка в процессе входа!", error.response?.data);
            if (error.response && error.response.data) {
                Object.keys(error.response.data).forEach(field => {
                    const errorMessages = error.response.data[field];
                    if (errorMessages && errorMessages.length > 0) {
                        setError(errorMessages[0]);
                    }
                })
            }
        }

        finally {
            setIsLoading(false);
        }
    }
    return (
        <section className={style.container}>
            <form className={style.form}>
                <span className={style.title}>Авторизация</span>

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

                <button type="submit" disabled={isLoading} className={style.button} onClick={handleSubmit} >Вход</button>
                {error && <p style={{ color: "red" }}>{error}</p>}
                {successMessage && <p style={{ color: "green" }} >{successMessage}</p>}
            </form>
        </section>
    )
}

export default Login