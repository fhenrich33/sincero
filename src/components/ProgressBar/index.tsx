import styles from './progressBar.module.css'

type Props = {
  id: string | number
  value: number
  max: number
  label?: string
  onChange?: (se: React.SyntheticEvent) => void
}

/**
 * Stylized progress bar
 */
const ProgressBar = (props: Props) => {
  const { id, value, max, label } = props

  const computedVal = Math.ceil((value / max) * 100)

  return (
    <div
      className={styles.progress}
      style={{ '--progress': computedVal + '%' } as React.CSSProperties}
    >
      <progress
        id={String(id)}
        value={value}
        max={max}
        aria-label={label ? label : `Progress Bar for ${String(id)}`}
      />
    </div>
  )
}

export default ProgressBar
