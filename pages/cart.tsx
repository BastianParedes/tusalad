
import styles from '../components/cart/styles/cart.module.css';

import React from 'react';
import { Provider } from '../components/cart/application/provider';
import Main from '../components/cart/components/main';
import Aside from '../components/cart/components/aside';
import Footer from '../components/cart/components/footer';

// import Modal from '../components/general/componentes/modal;



export default function Cart() {
    return (
        <React.StrictMode>
            <Provider>
                <div className={styles['cart']}>
                    <div className={styles['cart__div']}>
                        <Main />
                        <Aside />
                    </div>
                    <Footer />
                </div>
            </Provider>
        </React.StrictMode>
    );
}

