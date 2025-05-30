import styles from './footer.module.scss'

export default function FooterPageComponent() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footer_container}>
        <p className={styles.footer_text}>
          Copyright © {currentYear}. Codenary All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
