import { QuestionT } from '../../context/QuestionProvider'
import Button from '../Button'
import ScaleRating from '../ScaleRating'
import styles from './wizard.module.css'
import MultipleChoice from '../MultipleChoice'
import ProgressBar from '../ProgressBar'
import { UserT } from '../../context/types'
import User from '../User'
import useWizard from './useWizard'

type Props = {
  questions: QuestionT[]
  user: UserT
  submit: (...args: any) => void
}

const Wizard = (props: Props) => {
  const { questions, user, submit } = props
  const {
    step,
    currentInput,
    disableNext,
    currentAnswer,
    skippable,
    previous,
    next,
    handleChange,
    skip,
  } = useWizard({ questions, submit })

  return (
    <>
      {questions?.length && (
        <div className={styles.wrapper} role="group">
          <div role="none" className={styles.headerWrapper}>
            <div role="none">
              <h2>{questions[step].label}</h2>
              <span className={styles.subHeader}>
                share your feedback for {user.name}
              </span>
            </div>
            <User
              className={styles.userAvatar}
              name={user.name}
              avatarUrl={user.avatarUrl}
              avatarOnly
            />
          </div>
          <div role="none" className={styles.container}>
            {questions[step].type === 'text' && (
              <textarea
                id={questions[step].id}
                ref={currentInput}
                className={styles.textarea}
                name={questions[step].label}
                value={currentAnswer}
                onChange={handleChange}
                placeholder="Say something"
              />
            )}
            {questions[step].type === 'scale' && (
              <ScaleRating
                id={questions[step].id}
                ref={currentInput}
                className={styles.rating}
                name={questions[step].label}
                value={Number(currentAnswer)}
                onChange={handleChange}
                showLegend
              />
            )}
            {questions[step].type === 'multipleChoice' && (
              <MultipleChoice
                ref={currentInput}
                options={questions[step].options}
                currentAnswer={currentAnswer}
                label={questions[step].label}
                onChange={handleChange}
              />
            )}
            <div className={styles.buttonControls} role="none">
              <Button title="Ctrl + Backspace" onClick={previous}>
                Previous
              </Button>
              {skippable && (
                <Button title="Ctrl + Q" onClick={skip}>
                  Skip
                </Button>
              )}
              <Button
                title="Ctrl + Enter"
                primary
                disabled={disableNext}
                onClick={next}
              >
                Next
              </Button>
            </div>
            <ProgressBar
              id="progress"
              value={step + 1}
              max={questions.length}
            />
            <br />
            <label className={styles.questionsCompleted} htmlFor="progress">
              Questions Completed <br />
              {step + 1}/{questions.length}
            </label>
          </div>
        </div>
      )}
    </>
  )
}

export default Wizard
