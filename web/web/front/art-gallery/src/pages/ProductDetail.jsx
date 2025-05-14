import React from 'react'
import { useState , useEffect} from 'react';
import { useParams} from 'react-router-dom';
import style from './ProductDetail.module.css';

function ProductDetail() {
  const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Функция для получения данных о товаре по slug
        const fetchProduct = async () => {
            try {
                // Замените URL на ваш API или источник данных
                const response = await fetch(`http://localhost:8000/api/pics/${slug}`);
                if (!response.ok) {
                    throw new Error('Ошибка при загрузке данных');
                }
                const data = await response.json();
                setProduct(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
    }, [slug]);

    if (loading) {
        return <div>Загрузка...</div>;
    }

    if (error) {
        return <div>Ошибка: {error}</div>;
    }

    if (!product) {
        return <div>Товар не найден</div>;
    }

    return (
        <div className={style.productPage}>
            <img src={product.Pic_image} alt={product.name} className={style.productImage} />
            <h1 className={style.productName}>{product.name}</h1>
            <p className={style.productAuthor}>Автор: {product.pic_au_name}</p>
            <p className={style.productDescription}>{product.Pic_contain}</p>
            <div className={style.priceBlock}>
                <span className={style.finalPrice}>Цена : {product.final_price} ₽</span>
                {product.discount > 0 && (
                    <>
                        <span className={style.oldPrice}>{product.orig_price} ₽</span>
                        <span className={style.discount}>-{product.discount}%</span>
                    </>
                )}
            </div>
        </div>
    );
}

export default ProductDetail