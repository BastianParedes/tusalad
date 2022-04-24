
import React from 'react';
import { Context } from '../../application/provider';
import styles from './styles.module.css';

const JSONProducts: any = require('/public/products.json');




function Product({ productKey }: any) {
    let context: any = React.useContext(Context);
    const min: number = context.min;
    const max: number = context.max;

    const setCart = (quantity: number): void => {
        let cart = {...context.cart};
        cart[productKey] = quantity;
        context.setCart(cart);
    }

    const handleQuantity = (event: any): void => {
        let newQuantity: number = parseInt(event.target.value) || min;
        if (newQuantity < min) {
            setCart(min);
        } else if (newQuantity > max) {
            setCart(max);
        } else {
            setCart(newQuantity);
        }
    }

    const productInfo: {name: string, price: number, src: string, description: string, included: string, enabled: boolean} = JSONProducts[productKey];
    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={'/images/'+productInfo.src} alt="" />
            <div className={styles['product-info-container']}>
                <span className={styles['product-name']}>{productInfo.name}</span>
                <span className={styles['product-description']}>{productInfo.description}</span>
            </div>
            <div className={styles['input-container']}>
                <button className={styles['button-add-one']} onClick={(): void => {
                    setCart(Math.max(min, context.cart[productKey] - 1));
                }}>-</button>
                <input type="number" className={styles['input-quantity']} value={context.cart[productKey]} min={min} max={max} onChange={handleQuantity}/>
                <button className={styles['button-substract-one']} onClick={(): void => {
                    setCart(Math.min(max, context.cart[productKey] + 1));
                }}>+</button>
            </div>
        </div>
    );
}




export default function Products() {
    let context: any = React.useContext(Context);

    return (
        <div className={styles['products']}>
            {Object.keys(context.cart).map((key: string) => <Product key={key} productKey={key} />)}
        </div>
    );
}

