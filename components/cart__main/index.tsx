
import { BsArrowReturnLeft } from 'react-icons/bs';
import styles from './styles.module.css';
import Products from '../cart__products';

export default function Main() {
    return (
        <main className={styles['main']}>
            <a className={styles['return-button']} href='/'><BsArrowReturnLeft /> Volver</a>
            <Products />
        </main>
    );
}
