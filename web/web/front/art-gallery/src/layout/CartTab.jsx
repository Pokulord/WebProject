import React, { useEffect, useState } from 'react';
import style from './CartTab.module.css';

function CartTab({ onClose }) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const storedCart = localStorage.getItem('cart');
        if (storedCart) {
            setItems(JSON.parse(storedCart));
        }
    }, []);

    const handleClearCart = () => {
        localStorage.removeItem('cart');
        setItems([]); 
    };

    const totalAmount = items.reduce((total, item) => total + (item.final_price * item.quantity), 0);

    return (
        <div className={style.cartOverlay}>
            <div className={style.cartContainer}>
                <h2>Корзина</h2>
                {items.length > 0 ? (
                    <>
                        <ul>
                            {items.map((item) => (
                                <li key={item.slug} className={style.cartItem}>
                                    <img src={item.img} alt={item.name} className={style.cartImage} />
                                    <div className={style.cartDetails}>
                                        <h3>{item.name}</h3>
                                        <p>Цена: {item.final_price} ₽</p>
                                        <p>Количество: {item.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <p>Общая сумма : {totalAmount} ₽</p>
                            <button className={style.clearCartBut} onClick={handleClearCart}>Очистка корзины</button>
                        </div>
                    </>
                ) : (
                    <p>Корзина пуста</p>
                )}
                <button onClick={onClose} className={style.closeButton}>Закрыть</button>
            </div>
        </div>
    );
}

export default CartTab;