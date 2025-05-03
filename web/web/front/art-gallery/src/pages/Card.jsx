import React from "react";
import style from './Card.module.css';

function Card({ img, title, price, oldPrice, discount, imgheight }) {
  return (
      <div className={style.card}>
          <img src={img} alt={title} className={style.image} style={{ height: imgheight }} />
          <div className={style.content}>
              <span className={style.title}>{title}</span>

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
  );
}

export default Card;