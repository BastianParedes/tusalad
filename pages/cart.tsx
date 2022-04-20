
import styles from '/public/styles/cart__cart.module.css';

import React from 'react';
import Main from '../components/cart__main';
import Aside from '../components/cart__aside';
import Footer from '../components/cart__footer';




export default function Cart() {
    return (
        <div className={styles['cart']}>
            <div className={styles['cart__div']}>
                <Main />
                <Aside />
            </div>
            <Footer />
        </div>
    );
}

