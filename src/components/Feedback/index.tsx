import classnames from 'classnames'
import User from '../User'
import { FeedbackT } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import NoFeedback from '../NoFeedback'
import { QuestionT } from '../../context/QuestionProvider'
import ScaleRating from '../ScaleRating'
import Badge from '../Badge'
import { getKey, getVal } from '../../utils'
import useUser from '../User/useUser'
import useFeedback from './useFeedback'
import useQuestion from '../Question/useQuestion'
import styles from './feedback.module.css'
import Button from '../Button'
import { useMemo } from 'react'

type Props = {
  /**
   * Feedback was given or received to the user.
   */
  feedbackDirection: 'to' | 'from'
  currentUser: UserT
  users: UserT[]
  feedback: FeedbackT[]
  questions: QuestionT[]
}

const Feedback = (props: Props) => {
  const { feedbackDirection, currentUser, users, feedback, questions } = props
  const { getTargetUser } = useUser({ users })
  const { getQuestion, getQuestionOptionLabel } = useQuestion({ questions })
  const {
    hasNoFeedback,
    selectedFeedback,
    setSelectedFeedback,
    answersFromFeedback,
    flattenedFeedback,
  } = useFeedback({
    feedbackDirection,
    currentUser,
    feedback,
  })

  const feedbackUserHeader = useMemo(() => {
    const name =
      users.find((user) => user.id === getKey(selectedFeedback))?.name ?? ''

    const inflection = name.slice(-1) === 's' ? '’' : '’s'

    return `${name + inflection}  Feedback`
  }, [users, selectedFeedback])

  return (
    <>
      {hasNoFeedback ? (
        <NoFeedback />
      ) : (
        <>
          <h2>
            {feedbackDirection === 'from' ? 'My Feedback' : 'Team Feedback'}
          </h2>
          <div className={styles.feedbackContainer} role="group">
            <ul className={styles.users}>
              <li>
                <h4 className={styles.userColHeader}>
                  {feedbackDirection === 'from'
                    ? 'Feedback given'
                    : 'Feedback received'}
                </h4>
              </li>
              {Object.entries(flattenedFeedback).map(([fbKey, fbVal]) => (
                <li
                  key={fbKey}
                  className={classnames({
                    [styles.userSelected]:
                      getTargetUser(fbKey)?.id === getKey(selectedFeedback),
                  })}
                >
                  <Button
                    transparent
                    className={styles.userBtn}
                    onClick={() => setSelectedFeedback({ [fbKey]: fbVal })}
                  >
                    <User
                      name={getTargetUser(fbKey)?.name ?? ''}
                      avatarUrl={getTargetUser(fbKey)?.avatarUrl}
                      className={styles.userAvatar}
                    />
                  </Button>
                </li>
              ))}
            </ul>
            <ul className={styles.feedback}>
              <li>
                <h3 className={styles.feedbackHeader}>{feedbackUserHeader}</h3>
              </li>
              {answersFromFeedback &&
                answersFromFeedback.map((answer) => (
                  <li key={getKey(answer)} className={styles.questionContainer}>
                    <div role="none">{getQuestion(getKey(answer))?.label}</div>
                    <div role="none">
                      {!getVal(answer) && <Badge>skipped</Badge>}
                      {getQuestion(getKey(answer))?.type === 'text' &&
                        getVal(answer) && <p>{getVal(answer)}</p>}
                      {getQuestion(getKey(answer))?.type === 'scale' && (
                        <ScaleRating
                          id={getKey(answer)}
                          name={getQuestion(getKey(answer))?.label ?? ''}
                          value={Number(getVal(answer))}
                          readOnly
                        />
                      )}
                      {getQuestion(getKey(answer))?.type ===
                        'multipleChoice' && (
                        <p>{getQuestionOptionLabel(answer)}</p>
                      )}
                    </div>
                  </li>
                ))}
            </ul>
          </div>
        </>
      )}
    </>
  )
}

export default Feedback
