import styles from '../styles/cartButton.module.css';
import { BsCart4 } from 'react-icons/bs';

export default function CartButton() {
    return (
        <div className={styles['button-container']}>
            <a className={styles['button']} href='/cart'>
                <BsCart4 />
            </a>
        </div>
    );
}
