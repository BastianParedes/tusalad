import styles from '../styles/home.module.css';

export default function Home() {
    return (
        <header id='home' className={styles["header"]}>
            <h1 className={styles["header-text"]}>Tu Salad</h1>
        </header>
    );
}