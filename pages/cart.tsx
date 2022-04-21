
import styles from '/public/styles/cart__cart.module.css';

import React from 'react';

import Main from '../components/cart/main';
import Aside from '../components/cart/aside';
import Footer from '../components/cart/footer';




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

