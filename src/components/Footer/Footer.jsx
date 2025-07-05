import styles from './Footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.contact}>
          <h3>Contact</h3>
          <span>+1 (555) 293-8472</span>
          <span>support@kitchenmarket.com</span>
        </div>
        <div className={styles.address}>
          <h3>Shipping address</h3>
          <span>Kitchen Market Supplies Ltd.</span>
          <span>1425 Maplewood Drive</span>
          <span>94117 San Francisco</span>
          <span>United States</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
