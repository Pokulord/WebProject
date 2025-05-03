import React, { useState } from "react";
import style from './Support.module.css';

function Support() {
    const [message, setMessage] = useState("");

    const questions = [
        "Есть ли сертификат подлинности?",
        "Что если картина не понравится?",
        "Как быстро доставят картину?",
        "Какие способы оплаты у вас есть?"
    ];

    const handleQuestionClick = (question) => {
        setMessage(question);
    };

    return (
        <section className={style.container}>
            <div className={style.faq}>
                <span className={style.title}>Часто задаваемые вопросы</span>
                {questions.map((question, index) => (
                    <div
                        key={index}
                        className={style.faqItem}
                        onClick={() => handleQuestionClick(question)}>
                        <span>{question}</span>
                        <span className={style.arrow}>&#9660;</span>
                    </div>
                ))}
            </div>

            <form className={style.form}>
                <span className={style.formTitle}>У вас есть какие-нибудь вопросы?</span>
                <span className={style.text}>Ознакомьтесь со страницей часто задаваемых вопросов, чтобы получить быстрый ответ</span>
                <div className={style.formelement}>
                    <label htmlFor="name">Имя *</label>
                    <input type="text" id="name" name="name" required />
                </div>
                <div className={style.formelement}>
                    <label htmlFor="email">Email *</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div className={style.formelement}>
                    <label htmlFor="message">Сообщение *</label>
                    <textarea
                        id="message"
                        name="message"
                        rows="4"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}/>
                </div>
                <div className={style.checkboxContainer}>
                    <input type="checkbox" id="terms" required />
                    <label htmlFor="terms">I read the terms & conditions and the Privacy policy</label>
                </div>
                <button className={style.btn} type="submit">Отправить</button>
            </form>
        </section>
    );
}

export default Support;