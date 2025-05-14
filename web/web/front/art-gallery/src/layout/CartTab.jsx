import React, { useEffect, useState } from 'react';
import style from './CartTab.module.css';

function CartTab({ onClose }) {
    const [items, setItems] = useState([]);
    const [orderMessage, setOrderMessage] = useState("");

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

    const handleCheckout = async () => 
    {
        let success_flag = true
        let order_details = []
        for (const item of items)
        {
            const response = await fetch(`http://localhost:8000/api/pics/sell/${item.id}/` , 
                {
                    method : "PATCH",
                    headers : {
                        'Content-Type': "application/json",   
                    },
                    body : JSON.stringify({
                        howminus : item.quantity,
                        Sold_price : item.final_price
                    }),
                }
            )

            if (!response.ok)
            {
                const errorData = await response.json();
                alert("Ошибка при оформлении заказа! ", errorData);
                success_flag = false;
                break
            }
            else
            {
                alert("Заказ успешно оформлен для ", item.name)
                order_details.push(`${item.name}, цена ${item.final_price} ₽ количество ${item.quantity}`)
            }
        }

        if (success_flag)
        {
            handleClearCart();
            setOrderMessage(`Заказ успешно оформлен! Состав ${order_details.join(';')}`);
        }

        else
        {
            setOrderMessage("При оформлении заказа произошла ошибка!")
        }
    }

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
                                        <p>ID: {item.id}</p>
                                        <p>Цена: {item.final_price} ₽</p>
                                        <p>Количество: {item.quantity}</p>
                                    </div>
                                </li>
                            ))}
                        </ul>
                        <div>
                            <p>Общая сумма : {totalAmount} ₽</p>
                            <button className={style.clearCartBut} onClick={handleClearCart}>Очистка корзины</button>
                            <br />
                            <button className={style.clearCartBut} style={{backgroundColor : "green"}} onClick={handleCheckout} >Оформить заказ</button>
                        </div>
                    </>
                ) : (
                    <p>Корзина пуста</p>
                )}
                {orderMessage && <p>{orderMessage}</p>}
                <button onClick={onClose} className={style.closeButton}>Закрыть</button>
            </div>
        </div>
    );
}

export default CartTab;