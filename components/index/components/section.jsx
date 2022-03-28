import styles from '../styles/section.module.css';

export default function Section(props) {
    return (
        <section id={props.id} className={styles["section"]}>
            <h2 className={styles['tittle']}>
                <span className={styles['tittle-content']}>{props.tittle}</span>
            </h2>
            {props.children}
        </section>
    );
}

