import { useMemo, useState } from 'react'
import { AnswerT, FeedbackT } from '../../context/FeedbackProvider'
import { UserT } from '../../context/types'
import { getKey, getVal } from '../../utils'

type Deps = {
  /**
   * Feedback was given or received to the user.
   */
  feedbackDirection: 'to' | 'from'
  currentUser: UserT
  feedback: FeedbackT[]
}

/**
 * Feedback hook to abstract and manipulate feedback data
 */
export default function useFeedback(deps: Deps) {
  const { feedbackDirection, currentUser, feedback } = deps
  const reverseDirection = feedbackDirection === 'to' ? 'from' : 'to'

  const hasNoFeedback = useMemo(
    () => !feedback.some((fb) => fb[feedbackDirection] === currentUser.id),
    [feedback, currentUser, feedbackDirection],
  )

  const flattenedFeedback = useMemo(() => {
    const flatFeedback: Record<string, AnswerT[]> = {}

    feedback
      .filter((fb) => fb[feedbackDirection] === currentUser.id)
      .forEach((fb) => {
        flatFeedback[fb[reverseDirection]] = fb.answers
      })

    return flatFeedback
  }, [currentUser, feedback, feedbackDirection, reverseDirection])

  const initialSelectedFeedback = {
    [getKey(flattenedFeedback)]: getVal(flattenedFeedback),
  }

  const [selectedFeedback, setSelectedFeedback] = useState(
    initialSelectedFeedback,
  )

  const answersFromFeedback = useMemo(
    () => getVal(selectedFeedback),
    [selectedFeedback],
  )

  return {
    hasNoFeedback,
    initialSelectedFeedback,
    selectedFeedback,
    setSelectedFeedback,
    answersFromFeedback,
    flattenedFeedback,
  }
}
