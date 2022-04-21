import styles from './styles.module.css';

import Section from '../section';

import {BsFacebook, BsInstagram, BsLinkedin, BsWhatsapp} from 'react-icons/bs';
import {FiMail} from 'react-icons/fi'




export default function Contact() {
    return (
        <Section id='contact' tittle='Contáctanos'>
            <div className={styles["links-container"]}>
                <a className={styles['link']} target="_blank" rel="noreferrer noopener" href="https://www.facebook.com/290456995162919/posts/974205676788044/">
                    <BsFacebook />
                </a>
                <a className={styles['link']} target="_blank" rel="noreferrer noopener" href='https://instagram.com/tu.salad'>
                    <BsInstagram />
                </a>
                <a className={styles['link']} target="_blank" rel="noreferrer noopener" href='https://www.linkedin.com/posts/tu-salad-341a0118b_ensaladaspuertomontt-ensaladaspuertovaras-activity-6884460153312169984-rPLb'>
                    <BsLinkedin />
                    </a>
                <a className={styles['link']} target="_blank" rel="noreferrer noopener" href='https://api.whatsapp.com/send?phone=56947071640'>
                    <BsWhatsapp />
                </a>
                <a className={styles['link']} target="_blank" rel="noreferrer noopener" href='mailto:hola@tusalad.cl'>
                    <FiMail />
                </a>
            </div>
        </Section>
    );
}

