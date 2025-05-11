import React from "react";
import style from './Card.module.css';
import { useState } from "react";

function Card({img, author, name, slug, discount, final_price, orig_price, imgheight}) {
    console.log('GOT')
    if (!name) {
        return (
            <div>Нечего взять!</div>
        )
    }
    return (
        <>
            
                <div className={style.card}>
                    <img src={img} alt={name} className={style.image} style={{ height: imgheight }} />
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
                    </div>
                </div>
        </>

    );
}

export default Card;