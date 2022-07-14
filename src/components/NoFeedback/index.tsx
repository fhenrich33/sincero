import styles from './noFeedback.module.css'

const NoFeedback = () => (
  <section className={styles.container}>
    <h1>No feedback to display 🔮</h1>
    <span className={styles.subHeader}>
      There is no feedback to display at this time – check back in a bit!
    </span>
  </section>
)

export default NoFeedback
