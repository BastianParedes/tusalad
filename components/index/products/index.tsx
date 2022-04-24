
import React from 'react';
import { Context } from '../../application/provider';
import { BsCartPlus } from 'react-icons/bs'
import Section from '../section';
import styles from './styles.module.css';

const JSONProducts: any = require('/public/products.json');

type ProductProps = {
    id: string,
    name: string,
    price: number,
    src: string,
    description: string,
    included: string,
    openModal: any//funcion
}


type ProducstProps = {
    openModal: any//funcion
}


function Product(props: ProductProps) {
    let context: any = React.useContext(Context);
    const min: number = context.min;
    const max: number = context.max;


    let addToCart = () => {
        let cart = {...context.cart};
        cart[props.id] = Math.min(max, (cart[props.id] || 0) + 1);
        context.setCart(cart);
        props.openModal(props.src)
    }

    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={'/images/' + props.src} alt={props.name} />
            <div className={styles['name-price-button-cotainer']}>
                <div className={styles['name-price-cotainer']}>
                    <span className={styles['product-name']}>{props.name}</span>
                    <span className={styles['product-price']}>{'$ '+ props.price}</span>
                </div>
                <div className={styles['button-add-to-cart-container']}>
                    <button className={styles['button-add-to-cart']} onClick={addToCart}> <BsCartPlus />
                    </button>
                </div>                
            </div>
            <p className={styles['product-description']}>{props.description}</p>
            {props.included !== '' ? <span className={styles['product-included']}>*Incluye: {props.included}</span> : <></>}
        </div>
    );
}



export default function Products(props: ProducstProps) {
    return (
        <Section id='products' tittle='Productos'>
            <div className={styles['products']}>
                {Object.keys(JSONProducts).map((key) => {
                    const info: {name: string, price: number, src: string, description: string, included: string, enabled: boolean} = JSONProducts[key];
                    if (info.enabled) {
                        return <Product key={key} id={key} name={info.name} price={info.price} src={info.src} description={info.description} included={info.included} openModal={props.openModal} />
                    } else if (info.enabled) {
                        return <></>
                    }
                })}
            </div>
        </Section>
    );
}

