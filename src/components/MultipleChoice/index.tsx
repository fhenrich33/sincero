import { forwardRef, ForwardedRef } from 'react'
import { QuestionT } from '../../context/QuestionProvider'
import styles from './multipleChoice.module.css'

type Props = {
  label: string
  currentAnswer: string
  options: QuestionT['options']
  oneLiner?: boolean
  onChange?: (se: React.SyntheticEvent) => void
}

const MultipleChoice = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const { label, options, currentAnswer, oneLiner, onChange } = props

    const splitCopy = (label: string) => {
      const match = label.match(/[^-,.!?]+[-,.!?]+/g)

      return match ? (
        <>
          {match[0].replace(/[-,.!?]/g, '')}
          <br />
          {label.replace(match[0], '')}
        </>
      ) : (
        label
      )
    }

    return (
      <>
        {options?.map((option, i) => (
          <div key={`${option.label}-option-${i}`} role="none">
            <input
              id={option.label}
              ref={i === 0 ? ref : null}
              className={styles.input}
              name={label}
              type="radio"
              value={option.value}
              checked={Number(currentAnswer) === option.value}
              onChange={onChange}
            />
            <label htmlFor={option.label} className={styles.multiChoice}>
              {oneLiner ? option.label : splitCopy(option.label)}
            </label>
          </div>
        ))}
      </>
    )
  },
)

export default MultipleChoice
