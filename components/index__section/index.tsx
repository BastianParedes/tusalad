import styles from './styles.module.css';

type SectionProps = {
    id: string,
    tittle: string,
    children: any//html
}

export default function Section(props: SectionProps) {
    return (
        <section id={props.id} className={styles["section"]}>
            <h2 className={styles['tittle']}>
                <span className={styles['tittle-content']}>{props.tittle}</span>
            </h2>
            {props.children}
        </section>
    );
}

