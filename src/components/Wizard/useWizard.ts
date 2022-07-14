import { useState, Ref, useRef, useMemo, useCallback, useEffect } from 'react'
import { FeedbackT } from '../../context/FeedbackProvider'
import { QuestionT } from '../../context/QuestionProvider'
import { getVal } from '../../utils'

type Deps = {
  questions: QuestionT[]
  submit: (...args: any) => void
}

/**
 * Wizard hook to abstract form properties and controls.
 */
export default function useWizard(deps: Deps) {
  const { questions, submit } = deps

  const initialAnswers: FeedbackT['answers'] = questions.map((q) => ({
    [q.id]: '',
  }))

  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState(initialAnswers)

  const currentInput: Ref<any> = useRef(null)

  const focus = () => {
    if (currentInput.current) currentInput.current.focus()
  }

  const disableNext = useMemo(() => !getVal(answers[step]), [answers, step])

  const isFirstQuestion = useMemo(() => step === 0, [step])

  const isLastQuestion = useMemo(
    () => (questions ? step === questions.length - 1 : false),
    [step, questions],
  )

  const currentAnswer = useMemo(
    () => answers[step][questions[step].id],
    [step, answers, questions],
  )

  const skippable = useMemo(() => !questions[step].required, [questions, step])

  const previous = useCallback(
    () => setStep(() => (isFirstQuestion ? step : step - 1)),
    [step, isFirstQuestion],
  )

  const next = useCallback(() => {
    isLastQuestion ? submit(answers) : setStep(() => step + 1)
    setTimeout(focus, 0)
  }, [answers, submit, step, isLastQuestion])

  const handleChange = useCallback(
    (e) =>
      setAnswers(() => {
        answers[step][questions[step].id] = e.target.value ?? ''
        return [...answers]
      }),
    [step, answers, questions],
  )

  const skip = useCallback(() => {
    setAnswers(() => {
      answers[step][questions[step].id] = ''
      return [...answers]
    })
    setTimeout(next, 0)
  }, [step, answers, questions, next])

  useEffect(() => focus(), []) // focus in the first step's input

  useEffect(() => {
    const enterToGoNext = (e: KeyboardEvent) =>
      e.ctrlKey && e.key === 'Enter' && !disableNext ? next() : null
    const bckspcToGoPrevious = (e: KeyboardEvent) =>
      e.ctrlKey && e.key === 'Backspace' ? previous() : null
    const qToSkip = (e: KeyboardEvent) =>
      e.ctrlKey && e.key === 'q' && skippable ? skip() : null

    window.addEventListener('keyup', enterToGoNext)
    window.addEventListener('keyup', bckspcToGoPrevious)
    window.addEventListener('keyup', qToSkip)

    return () => {
      window.removeEventListener('keyup', enterToGoNext)
      window.removeEventListener('keyup', bckspcToGoPrevious)
      window.removeEventListener('keyup', qToSkip)
    }
  }, [next, previous, skippable, skip, disableNext])

  return {
    step,
    currentInput,
    disableNext,
    currentAnswer,
    skippable,
    previous,
    next,
    handleChange,
    skip,
  }
}
