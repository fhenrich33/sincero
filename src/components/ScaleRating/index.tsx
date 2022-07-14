import { SyntheticEvent, forwardRef, ForwardedRef, useState } from 'react'
import styles from './scaleRating.module.css'
import classnames from 'classnames'

type Props = {
  id: string | number
  name: string
  value: number
  className?: string
  total?: number
  showLegend?: boolean
  readOnly?: boolean
  onChange?: (se: SyntheticEvent) => void
}

/**
 * Star like scale/score rating. Uses a radio type input under the hood.
 */
const ScaleRating = forwardRef(
  (props: Props, ref: ForwardedRef<HTMLInputElement>) => {
    const {
      id,
      name,
      value,
      className,
      onChange,
      showLegend,
      readOnly,
      total,
    } = props

    const [hoverValue, setHoverValue] = useState(props.value)
    const baseTotal = 10

    return (
      <div
        role="group"
        className={classnames(styles.wrapper, className)}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className={styles.container} role="none">
          {new Array(total || baseTotal).fill(null).map((_v, i) => (
            <label
              key={`${id}-scale-${i}`}
              className={classnames(styles.square, {
                [styles.filled]: Number(value) >= i + 1,
                [styles.hover]: Number(hoverValue) >= i + 1,
                [styles.readOnly]: readOnly,
              })}
              onMouseOver={() => setHoverValue(i + 1)}
              onMouseLeave={() => setHoverValue(value)}
              onFocus={() => setHoverValue(i + 1)}
              htmlFor={`${id}-scale-${i + 1}`}
              aria-label={`Rating ${i + 1}`}
            >
              <input
                id={`${id}-scale-${i + 1}`}
                ref={i === 0 ? ref : null}
                className={styles.input}
                type="radio"
                name={name}
                value={i + 1}
                checked={Number(value) === i + 1}
                onChange={onChange}
                readOnly={readOnly}
              />
            </label>
          ))}
        </div>
        {showLegend && (
          <span className={styles.legend}>
            {value}/{total || baseTotal}
          </span>
        )}
      </div>
    )
  },
)

export default ScaleRating
