
import styles from '../styles/about.module.css';

export default function About() {
    return (
        <section className={styles['about-section']}>
            <span className={styles['tittle']}>Sobre nosotros</span>
            <h3 className={styles['slogan']}>Insertar slogan aquí</h3>
            <p className={styles['content']}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Rerum velit dicta, amet illum saepe adipisci incidunt eius. Sed, obcaecati delectus tempora fuga accusantium mollitia ratione, amet, vitae voluptates corporis reiciendis?</p>
        </section>
    );
}
