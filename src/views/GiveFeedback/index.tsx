import { useCallback, useContext, useMemo, useState } from 'react'
import { Icon } from '@iconify/react'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'
import User from '../../components/User'
import Button from '../../components/Button'
import styles from './giveFeedback.module.css'
import Wizard from '../../components/Wizard'
import { AccountContext } from '../../context/AccountProvider'
import { QuestionContext, QuestionT } from '../../context/QuestionProvider'
import {
  DispatchFeedbackContext,
  DispatchFeedbackContextT,
  FeedbackContext,
} from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import { NavLink } from 'react-router-dom'
import FeedbackWrapup from '../../components/FeedbackWrapup'

const GiveFeedback = () => {
  const currentUser = useContext(AccountContext)
  const users = useContext(UserContext)
  const questions = useContext(QuestionContext)
  const feedback = useContext(FeedbackContext)
  const feedbackDispatch = useContext(
    DispatchFeedbackContext,
  ) as DispatchFeedbackContextT

  const [isFeedbacking, setIsFeedbacking] = useState(false)
  const [isWrappingup, setIsWrappingup] = useState(false)
  const [subject, setSubject] = useState<UserT>()

  const userWasGivenFeedback = useCallback(
    (user: UserT) =>
      feedback?.some((fb) => user.id === fb.to && currentUser?.id === fb.from),
    [feedback, currentUser],
  )

  const usersToGiveFeedback = useMemo(
    (noOfusers = 3) =>
      users
        ?.filter(
          (user) => user.id !== currentUser?.id && !userWasGivenFeedback(user),
        )
        .slice(0, noOfusers) ?? [],
    [users, currentUser, userWasGivenFeedback],
  )

  const returnToGiveFeedback = (user: UserT) => {
    setSubject(user)
    setIsFeedbacking(true)
    setIsWrappingup(false)
  }

  const handleSubmit = useCallback(
    (answers) => {
      if (currentUser && subject)
        feedbackDispatch({
          action: 'set',
          payload: {
            from: currentUser.id,
            to: subject.id,
            answers,
          },
        })
      else throw new Error('Not logged in!')

      if (usersToGiveFeedback.length && usersToGiveFeedback.length <= 3)
        setIsWrappingup(true)

      setIsFeedbacking(false)
    },
    [
      setIsFeedbacking,
      feedbackDispatch,
      currentUser,
      subject,
      usersToGiveFeedback.length,
    ],
  )

  return (
    <MainLayout loggedIn>
      <section aria-label="share-feedback">
        {isFeedbacking && subject && (
          <>
            <Button
              className={styles.backButton}
              transparent
              onClick={() => {
                setIsFeedbacking(false)
              }}
            >
              <span className={styles.back}>
                <Icon icon="ion-ios-arrow-forward" className={styles.reverse} />{' '}
                Back
              </span>
            </Button>
            <Wizard
              questions={questions as QuestionT[]}
              user={subject}
              submit={handleSubmit}
            />
          </>
        )}
        {isWrappingup && (
          <FeedbackWrapup
            users={usersToGiveFeedback}
            giveFeedback={returnToGiveFeedback}
          />
        )}
        {!isFeedbacking && !isWrappingup && (
          <div className={styles.wrapper}>
            <h1>Share Feedback</h1>
            {users && users.length > 0 && (
              <ul className={styles.users}>
                {users
                  .filter((user) => user.id !== currentUser?.id)
                  .map((user) => (
                    <li key={user.id} className={styles.user}>
                      <User name={user.name} avatarUrl={user.avatarUrl} />
                      <span style={{ flex: 1 }} />
                      {userWasGivenFeedback(user) ? (
                        <NavLink exact to={`/my-feedback/`}>
                          <Button className={styles.button}>
                            View Submissions
                          </Button>
                        </NavLink>
                      ) : (
                        <Button
                          className={styles.button}
                          primary
                          onClick={() => {
                            setSubject(user)
                            setIsFeedbacking(true)
                          }}
                        >
                          Fill out
                        </Button>
                      )}
                    </li>
                  ))}
              </ul>
            )}
          </div>
        )}
      </section>
    </MainLayout>
  )
}

export default GiveFeedback
