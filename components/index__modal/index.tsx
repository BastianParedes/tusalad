import React from 'react';
import { GrClose, GrStatusGood } from 'react-icons/gr';

import styles from './styles.module.css';

type ModalProps = {
    imageName: string ,
    closeModal: any//funcion
}


export default function Modal(props: ModalProps) {

    let goToCart = () => {
        window.location.href = "/cart";
    };

    return (
        <div className={styles['background']}>
            <div className={styles['container']}>
                <div className={styles['header']}>
                    <div className={styles['success-icon-container']}>
                        <span className={styles['success-icon']}><GrStatusGood /></span>
                    </div>
                    <div className={styles['tittle-container']}>
                        <span className={styles['tittle-constat-part']}>¡Felicidades! Agregaste</span>
                        <span className={styles['product-name']}>{'Product name'}</span>
                        <span className={styles['tittle-constat-part']}>a tu carro.</span>
                    </div>
                    <div className={styles['btn-close-modal-container']}>
                        <button className={styles['btn-close-modal']} onClick={props.closeModal}><GrClose /></button>
                    </div>
                </div>
                <div className={styles['main']}>
                    <div className={styles['product-image-container']}>
                        <img className={styles['product-image']} src={'/images/' + props.imageName} alt={props.imageName} />
                    </div>
                    <div className={styles['btns-container']}>
                        <button className={styles['btn-keep-buying']} onClick={props.closeModal}>Seguir comprando</button>
                        <button className={styles['btn-cart']} onClick={goToCart}>Ver carrito</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

