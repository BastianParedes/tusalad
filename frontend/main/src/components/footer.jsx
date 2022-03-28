import styles from '../styles/footer.module.css';


export default function Footer() {
    return (
        <footer className={styles["footer"]}>
            <p className={styles["p-footer"]}>Website designed by @Bastián Paredes, © 2022</p>
        </footer>
    );
}