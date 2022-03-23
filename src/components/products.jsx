
import Section from './section.jsx';
import styles from '../styles/products.module.css';
console.log(styles);

function Product(props) {
    return (
        <div className={styles['product-container']}>
            <img className={styles['product-image']} src={props.src} alt={props.name} />
            <span className={styles['product-name']}>{props.name}</span>
            <span className={styles['product-price']}>{props.price}</span>
            <p className={styles['product-description']}>{props.description}</p>
            {props.included !== '' ? <span className={styles['product-included']}>*Incluye: {props.included}</span> : <></>}
        </div>
    );
}


export default function Products() {
    return (
        <Section id='products' tittle='Productos'>
            <div className={styles['products']}>
                <Product
                    name='Ensalada Alberto'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con mix lechuchas premium, costina, lollo bionda, salmón filete o slice, espinaca, apio, choclo, pimiento verde, cous cous, smillas de zappallo y crutones.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Molly'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con base mix lechugas, costina, marina, brócoli, pepino, pimiento rojo, brotes varios, semilla de amapolas, crutons y quinoa.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Mai'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con mix lechugas premium, costins, lollo bionda, lollo rosa, apio, choclo, palmitos, brotes varios, tomate cherry, pimiento rojo y sésamo.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Mila'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con mix lechugas premium, costina, lollo bionda, lollo rosa, huevo, choclo, palta hass, aceitunas sin carozo, tomate cherry, cous cous y sésamo.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Isidora'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con lechuga costina, lechuga lollo rosa o bionda, lechuga marina, vacuno, espinaca, pimiento rojo, espárragos, cous cous, brotes varios y choclo.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Manuel'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con lechuga marina, palta zanahoria, quinoa, porotos negros, apio, tomate cherry, espárragos, semillas de zapallo y sésamo.'
                    included='Cubiertos compostables y aderezos.'
                />
                <Product
                    name='Ensalada Ozzy'
                    price='$12.000'
                    src={require('../images/product 1.jpg')}
                    description='Bol con mix lechugas premium, costina, lollo bionda, lollo rosa, pollo, quinoa, brotes varios, apio, palmito, tomates cherry, sésamo y semillas de zapallo.'
                    included='Cubiertos compostables y aderezos.'
                />
            </div>
        </Section>
    );
}

