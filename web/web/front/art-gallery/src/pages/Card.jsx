import React from "react";
import style from './Card.module.css';
import { useState } from "react";

function Card({ id, img, author, name, slug, discount, final_price, orig_price, imgSize = 'md', how_many, forsell }) {
    console.log('GOT')
    if (!name) {
        return (
            <div>Нечего взять!</div>
        )
    }
    const [counter, setCounter] = useState(1);
    function increment() {
        if (counter < how_many) {
            setCounter(prev => prev + 1);
        }
    }

    function decrement() {
        if (Number(counter) > 1) {
            setCounter(prev => prev - 1);
        }
    }

    function addToCart() {
        const product = {
            id,
            img,
            author,
            name,
            slug,
            final_price,
            orig_price,
            discount,
            quantity: counter
        }


        let cart = JSON.parse(localStorage.getItem('cart')) || [];

        const existingProductIndex = cart.findIndex(item => item.slug === slug)

        if (existingProductIndex > -1) {
            const newQuantity = cart[existingProductIndex].quantity + counter;
            if (newQuantity > how_many) {
                alert(`Превышено допустимое количество товара : ${how_many}`);
                return;
            }

            cart[existingProductIndex].quantity = newQuantity;
        }
        else { cart.push(product); }


        localStorage.setItem('cart', JSON.stringify(cart));

        alert("Товар успешно добавлен в корзину")
    }

    return (
        <>

            <div className={style.card}>
                <img src={img} alt={name} className={`${style.image} ${style[imgSize]}`} />
                <div className={style.content}>
                    <span className={style.pic_au}>{author}</span>
                    <a className={style.title} href={"/gallery/" + slug}>{name}</a>
                    <div className={style.priceBlock}>
                        <span className={style.price}>{final_price} ₽</span>
                        {discount > 0 && (
                            <>
                                <span className={style.oldPrice}>{orig_price}</span>
                                <span className={style.discount}>-{discount}%</span>
                            </>
                        )}
                    </div>
                    {forsell && (
                        <>
                            <span className={style.how_many}>В наличии : {how_many}</span>
                            <div className={style.order_sect}>
                                <button className={style.pic_minus_button} onClick={decrement}>-</button>
                                <input type="text" className={style.pic_count_input} value={counter} name="pic__order_count" />
                                <button className={style.pic_plus_button} onClick={increment}>+</button>
                                <button className={style.add_to_cart_but} onClick={addToCart} >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-basket" viewBox="0 0 16 16">
                                        <path d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1v4.5a2.5 2.5 0 0 1-2.5 2.5h-9A2.5 2.5 0 0 1 1 13.5V9a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h1.217L5.07 1.243a.5.5 0 0 1 .686-.172zM2 9v4.5A1.5 1.5 0 0 0 3.5 15h9a1.5 1.5 0 0 0 1.5-1.5V9H2zM1 7v1h14V7H1zm3 3a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 4 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 6 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3A.5.5 0 0 1 8 10zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5zm2 0a.5.5 0 0 1 .5.5v3a.5.5 0 0 1-1 0v-3a.5.5 0 0 1 .5-.5z" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    )
                    }
                </div>
            </div>
        </>

    );
}

export default Card;