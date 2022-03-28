import React from 'react';
import { GrClose, GrStatusGood } from 'react-icons/gr';

import styles from '../styles/modal.module.css';



export default function Modal(props) {
    let [url, setUrl] = React.useState('');
    let [token, setToken] = React.useState('');

    React.useEffect(() => {
        let cart = sessionStorage.getItem('cart');
        cart = JSON.parse(cart);
        let buyingProducts = cart.products.filter((product) => {
            return product.quantity !== 0;
        });

        if (buyingProducts.length === 0) { // no permite comprar si el carrito está vacío. Esto puede pasar si el usuario edita el sessionStorage.
            alert('No agregaste nada al carrito.');
            return;
        }

        let totalPrice = 0;
        buyingProducts.forEach((product) => {
            totalPrice += product.quantity * product.price;
        });

        let sendingJSON = { products: buyingProducts};

        fetch('http://localhost:3000/buy', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(sendingJSON)
        })
        .then(response => response.json())
        .then(json => {
            sessionStorage.setItem('url', json.url);
            sessionStorage.setItem('token', json.token);
            setUrl(json.url);
            setToken(json.token);
            
            // window.location.href = "http://localhost:3000/cart/";
            // window.location.href = "/cart/";
        });
    }, []);



    return (
        <div className={styles['background']}>
            <div className={styles['container']}>
                <div className={styles['header']}>
                    <div className={styles['success-icon-container']}>
                        <span className={styles['success-icon']}><GrStatusGood /></span>
                    </div>
                    <div className={styles['tittle-container']}>
                        <span className={styles['tittle-constat-part']}>¡Felicidades! Agregaste</span>
                        <span className={styles['product-name']}>{'Product name'}</span>
                        <span className={styles['tittle-constat-part']}>a tu carro.</span>
                    </div>
                    <div className={styles['btn-close-modal-container']}>
                        <button className={styles['btn-close-modal']} onClick={props.closeModal}><GrClose /></button>
                    </div>
                </div>
                <div className={styles['main']}>
                    <div className={styles['product-image-container']}>
                        <img className={styles['product-image']} src={require('../images/' + props.imageName)} alt={props.imageName} />
                    </div>
                    <div className={styles['btns-container']}>
                        <button className={styles['btn-keep-buying']} onClick={props.closeModal}>Seguir comprando</button>
                        <button className={styles['btn-cart']}>Ver carrito</button>
                        <form action={url} method="POST" className={styles['']}>
                            <input type="hidden" name="token_ws" value={token}/>
                            <input className={styles['btn-buy-now']} type="submit" value="Comprar ahora"/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

