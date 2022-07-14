import styles from './spinner.module.css'

const Spinner = () => (
  <div className={styles.spinner}>
    {new Array(4).fill('').map(() => (
      <div />
    ))}
  </div>
)

export default Spinner
