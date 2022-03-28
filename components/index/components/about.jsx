import styles from '../styles/about.module.css';

import Section from './section.jsx';

export default function About() {
    return (
        <Section id='about' tittle='Sobre nosotros'>
            <h3 className={styles['slogan']}>Insertar slogan aquí</h3>
            <p className={styles['content']}>Tu Salad es un emprendimiento bla bla bla bla Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum velit dicta, amet illum saepe adipisci incidunt eius. Sed, obcaecati delectus tempora fuga accusantium mollitia ratione, amet, vitae voluptates corporis reiciendis?</p>
        </Section>
    );
}
