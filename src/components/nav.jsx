import styles from '../styles/nav.module.css';

export default function Nav(){
    return (
        <nav className={styles['nav']}>
            <div className={styles['logo-container']}>
                <a href="#">
                    <img className={styles['logo']} src={require('../images/logo.png')} alt="Tu Salad" />
                </a>
            </div>
            <a href="#" className={styles['button']}>Nosotros</a>
            <a href="#" className={styles['button']}>Servicios</a>
            <a href="#" className={styles['button']}>Contacto</a>
        </nav>
    );
}