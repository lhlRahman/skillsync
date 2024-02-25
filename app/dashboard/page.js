import styles from "../../styles/Dashboard.module.scss";

export default function Dashboard() {
  return (
    <main id={styles.dashboard}>
      <div className={styles.header}></div>
      <div className={styles.wrapper}>
        <ul className={styles.routes}>
          <li> </li>
        </ul>
      </div>
    </main>
  );
}
