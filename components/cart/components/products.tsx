
import React from 'react';

import styles from '../styles/products.module.css';

const JSONProducts: any = require('/public/products.json');

type ProductProps = {
    productKey: string,
    quantity: number,
}


function Product(props: ProductProps) {
    let [quantity, setQuantity]: any = React.useState(props.quantity);

    React.useEffect((): void => {
        let cart = JSON.parse(sessionStorage.getItem('cart') || '{}');
        cart[props.productKey] = quantity;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [quantity]);

    const productInfo: {name: string, price: number, src: string, description: string, included: string} = JSONProducts[props.productKey];
    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src="" alt="" />
            <div className={styles['product-info-container']}>
                <span className={styles['product-name']}>{productInfo.name}</span>
                <span className={styles['']}>Descripción</span>
            </div>
            <div className={styles['']}>
                <button className={styles['button-add-one']} onClick={(): void => setQuantity((q: number): number => Math.max(0, q-1))}>-</button>
                <input type="number" className={styles['']} value={quantity} onChange={(event: any): void => setQuantity(Math.max(0, parseInt(event.target.value)))} />
                <button className={styles['button-substract-one']} onClick={(): void => setQuantity((q: number): number => Math.max(0, q+1))}>+</button>
            </div>
        </div>
    );
}


export default function Products() {
    let [cart, setCart]: any[] = React.useState({});

    React.useEffect((): void => {
        setCart(() => JSON.parse(sessionStorage.getItem('cart') || '{}'));
    }, [])
    

    return (
        <div className={styles['products']}>
            {Object.keys(cart).map((key: string) => <Product key={key} productKey={key} quantity={cart[key]} />)}
        </div>
    );
}

