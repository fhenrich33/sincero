import { NavLink } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import styles from './notFound.module.css'

const NotFound = () => (
  <MainLayout loggedIn>
    <section className={styles.container}>
      <h1 className={styles.header}>404</h1>
      <p className={styles.copy}>
        404 Sorry! The page you are looking for cannot be found. 😢
      </p>
      {/* TODO: ccorrectly redirect to share feedback */}
      <NavLink exact to={`/share-feedback/`}>
        <Button primary>Back to Share Feedback</Button>
      </NavLink>
    </section>
  </MainLayout>
)

export default NotFound
