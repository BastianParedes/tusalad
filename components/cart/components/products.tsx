
import React from 'react';

import styles from '../styles/products.module.css';

const JSONProducts: any = require('/public/products.json');

type ProductProps = {
    productKey: string,
    quantity: number,
}


function Product(props: ProductProps) {
    let [quantity, setQuantity]: any = React.useState(props.quantity);
    const min: number = 0;
    const max: number = 20;

    React.useEffect((): void => {
        let cart: any = JSON.parse(sessionStorage.getItem('cart') || '{}');
        cart[props.productKey] = quantity;
        sessionStorage.setItem('cart', JSON.stringify(cart));
    }, [quantity]);


    let handleQuantity = (event: any): void => {
        let newQuantity: number = parseInt(event.target.value) || min;
        if (newQuantity < min) {
            setQuantity(min);
        } else if (newQuantity > max) {
            setQuantity(max);
        } else {
            setQuantity(newQuantity);
        }
    }

    const productInfo: {name: string, price: number, src: string, description: string, included: string} = JSONProducts[props.productKey];
    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={'/images/'+productInfo.src} alt="" />
            <div className={styles['product-info-container']}>
                <span className={styles['product-name']}>{productInfo.name}</span>
                <span className={styles['product-description']}>{productInfo.description}</span>
            </div>
            <div className={styles['input-container']}>
                <button className={styles['button-add-one']} onClick={(): void => setQuantity((q: number): number => Math.max(min, q-1))}>-</button>
                <input type="number" className={styles['input-quantity']} value={quantity} min={min} max={max} onChange={handleQuantity}/>
                <button className={styles['button-substract-one']} onClick={(): void => setQuantity((q: number): number => Math.min(max, q+1))}>+</button>
            </div>
        </div>
    );
}




export default function Products() {
    let [cart, setCart]: any = React.useState({"0":4,"1":2,"2":1,"3":0});
    // {"0":4,"1":2,"2":1,"3":0}
    React.useEffect((): void => {
        setCart(():void => JSON.parse(sessionStorage.getItem('cart') || '{}'));
    }, [])
    

    return (
        <div className={styles['products']}>
            {Object.keys(cart).map((key: string) => <Product key={key} productKey={key} quantity={cart[key]} />)}
        </div>
    );
}

