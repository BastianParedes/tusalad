import styles from '../styles/nav.module.css';

export default function Nav(){
    return (
        <nav className={styles['nav']}>
            <div className={styles['logo-container']}>
                <a href="#about">
                    <img className={styles['logo']} src={require('../images/logo.png')} alt="Tu Salad" />
                </a>
            </div>
            <a href="#home" className={styles['button']}>Home</a>
            <a href="#about" className={styles['button']}>Nosotros</a>
            <a href="#services" className={styles['button']}>Servicios</a>
            <a href="#products" className={styles['button']}>Productos</a>
            <a href="#contact" className={styles['button']}>Contacto</a>
        </nav>
    );
}