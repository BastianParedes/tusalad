import styles from './styles.module.css';

import { AiFillHome } from 'react-icons/ai';
import { BsFillPeopleFill } from 'react-icons/bs';
import { MdMiscellaneousServices, MdProductionQuantityLimits, MdOutlineContactSupport } from 'react-icons/md';

export default function Nav(){
    return (
        <nav className={styles['nav']}>
            <div className={styles['link-container']}>
                <a href="#home" className={styles['button']}>
                    <span className={styles['button-icon']}><AiFillHome /></span>
                    <span className={styles['button-name']}>Home</span>
                </a>
            </div>
            <div className={styles['link-container']}>
                <a href="#about" className={styles['button']}>
                    <span className={styles['button-icon']}><BsFillPeopleFill /></span>
                    <span className={styles['button-name']}>Nosotros</span>
                </a>
            </div>
            <div className={styles['link-container']}>
                <a href="#services" className={styles['button']}>
                    <span className={styles['button-icon']}><MdMiscellaneousServices /></span>
                    <span className={styles['button-name']}>Servicios</span>
                </a>
            </div>
            <div className={styles['link-container']}>
                <a href="#products" className={styles['button']}>
                    <span className={styles['button-icon']}><MdProductionQuantityLimits /></span>
                    <span className={styles['button-name']}>Productos</span>
                </a>
            </div>
            <div className={styles['link-container']}>
                <a href="#contact" className={styles['button']}>
                    <span className={styles['button-icon']}><MdOutlineContactSupport /></span>
                    <span className={styles['button-name']}>Contacto</span>
                </a>
            </div>
        </nav>
    );
}