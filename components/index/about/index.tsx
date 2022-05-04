import styles from './styles.module.css';

import Section from '../section';

export default function About() {
    return (
        <Section id='about' tittle='Sobre nosotros'>
            <h3 className={styles['slogan']}>Porque lo saludable sabe bien</h3>
            <p className={styles['content']}>Tu Salad es un emprendimiento dedicado a la venta de bowls de comida sana como ninguna otra tienda puede hacerlo. Usamos ingredientes de máxima calidad y recetas propias que promueven la vida sana sin dejar de lado su rico sabor. Compra con nosotros y nos aseguraremos de que tu compra llegue a la puerta de tu casa mintos mas tarde.</p>
        </Section>
    );
}
