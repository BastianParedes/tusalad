import styles from './styles.module.css';

export default function Home() {
    return (
        <header id='home' className={styles["header"]}>
            <h1 className={styles["header-text"]}>
                Tu
                <br />
                Salad
            </h1>
        </header>
    );
}