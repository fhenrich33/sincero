import { useCallback } from 'react'
import { AnswerT } from '../../context/FeedbackProvider'
import { QuestionT } from '../../context/QuestionProvider'
import { getKey, getVal } from '../../utils'

type Deps = {
  questions: QuestionT[]
}

/**
 * Question hook to abstract and manipulate question data
 */
export default function useQuestion(deps: Deps) {
  const { questions } = deps

  const getQuestion = useCallback(
    (key: string) => questions.find((q) => q.id === key),
    [questions],
  )

  const getQuestionOptionLabel = useCallback(
    (answer: AnswerT) =>
      getQuestion(getKey(answer))?.options?.find(
        (option) => String(option.value) === getVal(answer),
      )?.label ?? '',
    [getQuestion],
  )

  return {
    getQuestion,
    getQuestionOptionLabel,
  }
}
