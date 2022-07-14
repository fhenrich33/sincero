import styles from './footer.module.css'

const Footer = () => (
  <footer className={styles.footer}>
    <a href="https://github.com/fhenrich33" target="_blank">
      Felipe Henrich
    </a>
    <small>
      Felipe Henrich {new Date().getFullYear()}, MIT License.
    </small>
  </footer>
)

export default Footer
