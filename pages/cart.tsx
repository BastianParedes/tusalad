
import styles from '../components/cart/styles/cart.module.css';

import React from 'react';
import Main from '../components/cart/components/main';
import Aside from '../components/cart/components/aside';
import Footer from '../components/cart/components/footer';

// import Modal from '../components/general/componentes/modal;



export default function App() {

    return (
        <React.StrictMode>
            <div className={styles['cart']}>
                <div className={styles['cart__div']}>
                    <Main />
                    <Aside />
                </div>
                <Footer />
            </div>
            
        </React.StrictMode>
    );
}

