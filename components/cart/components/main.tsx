
import { BsArrowReturnLeft } from 'react-icons/bs';
import styles from '../styles/main.module.css';
import Products from './products';

export default function Main(props: any) {
    return (
        <main className={styles['main']}>
            <a className={styles['']} href='/'><BsArrowReturnLeft /> Volver a la página principal</a>
            <Products />
        </main>
    );
}
