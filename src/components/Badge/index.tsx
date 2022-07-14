import { ReactNode } from 'react'
import classnames from 'classnames'
import styles from './badge.module.css'

type Props = {
  color?: string
  background?: string
  className?: string
  children: ReactNode
}

const Badge = (props: Props) => {
  const { background, color, children, className } = props

  return (
    <span
      className={classnames(styles.badge, className)}
      style={{ background, color }}
    >
      {children}
    </span>
  )
}

export default Badge
