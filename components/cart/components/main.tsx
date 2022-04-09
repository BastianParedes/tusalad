
import { BsArrowReturnLeft } from 'react-icons/bs';
import styles from '../styles/main.module.css';
import Products from './products';

export default function Main(props: any) {
    return (
        <main className={styles['main']}>
            <a className={styles['return-button']} href='/'><BsArrowReturnLeft /> Volver</a>
            <Products />
        </main>
    );
}
