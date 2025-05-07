import React from "react";
import style from './Card.module.css';
import { useState } from "react";

function Card({ img, title, price, oldPrice, discount, imgheight, items }) {
    console.log('GOT')
    console.log(items)
    if (!items && Array.isArray(items) == 0) {
        return (
            <div>Нечего взять!</div>
        )
    }
    return (
        <>
            {items.map((item, index) => (
                <div className={style.card}>
                    <img src={img} alt={title} className={style.image} style={{ height: imgheight }} />
                    <div className={style.content}>
                        <span className={style.pic_au}>{item.pic_au_name}</span>
                        <a className={style.title} href={item.Pic_slug}>{item.Pic_name}</a>
                        <div className={style.priceBlock}>
                            <span className={style.price}>{item.final_price} ₽</span>
                            {item.Pic_discount > 0 && (
                                <>
                                    <span className={style.oldPrice}>{item.Pic_price}</span>
                                    <span className={style.discount}>-{item.Pic_discount}%</span>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </>

    );
}

export default Card;