
import Section from './section.jsx';
import styles from '../styles/products.module.css';

function Product(props) {
    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={props.src} alt={props.name} />
            <span className={styles['product-name']}>{props.name}</span>
            <span className={styles['product-price']}>{props.price}</span>
        </div>
    );

}


export default function Products() {
    return (
        <Section id='products' tittle='Productos'>
            <div className={styles['products']}>
                <Product name='Producto 1' price='$12.000' src={require('../images/product 1.jpg')} />
                <Product name='Producto 2' price='$12.000' src={require('../images/product 1.jpg')} />
                <Product name='Producto 3' price='$12.000' src={require('../images/product 1.jpg')} />
                <Product name='Producto 4' price='$12.000' src={require('../images/product 1.jpg')} />
                <Product name='Producto 5' price='$12.000' src={require('../images/product 1.jpg')} />
                <Product name='Producto 6' price='$12.000' src={require('../images/product 1.jpg')} />
            </div>
        </Section>
    );
}

