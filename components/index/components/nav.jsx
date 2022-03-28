import styles from '../styles/nav.module.css';

export default function Nav(){
    return (
        <nav className={styles['nav']}>
            <div className={styles['link-container']}>
                <a href="#home" className={styles['button']}>Home</a>
            </div>
            <div className={styles['link-container']}>
                <a href="#about" className={styles['button']}>Nosotros</a>
            </div>
            <div className={styles['link-container']}>
                <a href="#services" className={styles['button']}>Servicios</a>
            </div>
            <div className={styles['link-container']}>
                <a href="#products" className={styles['button']}>Productos</a>
            </div>
            <div className={styles['link-container']}>
                <a href="#contact" className={styles['button']}>Contacto</a>
            </div>
        </nav>
    );
}