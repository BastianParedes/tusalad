
import JSONProducts from '/public/products.json';
import { BsCartPlus } from 'react-icons/bs'
import Section from './section.jsx';
import styles from '../styles/products.module.css';




function Product(props) {

    let addToCart = () => {
        let cart = JSON.parse(sessionStorage.getItem('cart'));
        let product = JSONProducts[props.id];

        if (cart[props.id] === undefined) {
            cart[props.id] = 0;
        }

        cart[props.id]++;
        sessionStorage.setItem('cart', JSON.stringify(cart));
        props.openModal(props.src)
    }

    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={'/images/' + props.src} alt={props.name} />
            <div className={styles['name-price-button-cotainer']}>
                <div className={styles['name-price-cotainer']}>
                    <span className={styles['product-name']}>{props.name}</span>
                    <span className={styles['product-price']}>{props.price}</span>
                </div>
                <div className={styles['button-add-to-cart-container']}>
                    <button className={styles['button-add-to-cart']} onClick={addToCart}>
                        <BsCartPlus />
                    </button>
                </div>                
            </div>
            <p className={styles['product-description']}>{props.description}</p>
            {props.included !== '' ? <span className={styles['product-included']}>*Incluye: {props.included}</span> : <></>}
        </div>
    );
}


export default function Products(props) {
    return (
        <Section id='products' tittle='Productos'>
            <div className={styles['products']}>
                {Object.keys(JSONProducts).map((key) => {
                    const info = JSONProducts[key];
                    return <Product key={key} id={key} name={info.name} price={'$ '+info.price} src={info.src} description={info.description} included={info.included} openModal={props.openModal} />
                })}
            </div>
        </Section>
    );
}

