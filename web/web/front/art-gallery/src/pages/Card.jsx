import React from "react";
import style from './Card.module.css';
import { useState } from "react";

function Card({ img, title, price, oldPrice, discount, imgheight, items }) {
    console.log('GOT')
    console.log(items)
    if (!items && Array.isArray(items) == 0)
    {
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
            <span className={style.title}>{item.Pic_name}</span>
            <div className={style.priceBlock}>
                <span className={style.price}>{price}</span>
                {oldPrice && (
                    <span className={style.oldPrice}>{oldPrice}</span>
                )}
                {discount && (
                    <span className={style.discount}>-{discount}%</span>
                )}
            </div>
        </div>
    </div>
    ))}
    </>
    
  );
}

export default Card;