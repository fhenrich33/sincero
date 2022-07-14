import { UserT } from '../../context/types'
import Button from '../Button'
import User from '../User'
import styles from './feedbackWrapup.module.css'

type Props = {
  users: UserT[]
  giveFeedback: (...args: any) => void
}

const FeedbackWrapup = (props: Props) => {
  const { users, giveFeedback } = props

  return (
    <section aria-labelledby="feedback-wrapup">
      <h1 id="feedback-wrapup" className={styles.header}>
        Thank you for sharing your feedback!
      </h1>
      <span className={styles.subHeader}>
        Continue to give feedback to other team members.
      </span>
      <div className={styles.container}>
        {users && users.length > 0 && (
          <ul className={styles.users}>
            {users.map((user) => (
              <li key={user.id} className={styles.user}>
                <User name={user.name} avatarUrl={user.avatarUrl} />
                <span style={{ flex: 1 }} />
                <Button primary onClick={() => giveFeedback(user)}>
                  Fill out
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  )
}

export default FeedbackWrapup
