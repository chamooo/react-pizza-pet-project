import React from 'react';
import { Link } from 'react-router-dom';
import cartEmptyImage from '../assets/img/empty-cart.png';

const EmptyCart = () => {
    return (
        <>
            <div className="cart cart--empty">
                <h2>
                    Кошик порожній <icon>😕</icon>
                </h2>
                <p>
                    А-ну бігом замовили нашу найсмачнішу піцу!
                    <br />
                    Для того, щоб замовити піцу, перейдіть на головну сторінку.
                </p>
                <img src={cartEmptyImage} alt="Empty cart" />
                <Link to="/" className="button button--black">
                    <span>Повернутися назад</span>
                </Link>
            </div>
        </>
    );
};

export default EmptyCart;
