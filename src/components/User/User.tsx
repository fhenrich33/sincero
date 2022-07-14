import classnames from 'classnames'
import styles from './user.module.css'

type Props = {
  name: string
  avatarUrl?: string
  avatarOnly?: boolean
  className?: string
}

const User = (props: Props) => {
  const { name, avatarUrl, avatarOnly, className } = props
  const initials = name
    .split(' ')
    .map((word) => word[0])
    .join('')

  return (
    <div className={classnames(styles.user, className)} role="none">
      {avatarUrl ? (
        <img className={styles.avatar} alt={name} src={avatarUrl} />
      ) : (
        <span className={styles.initials}>{initials}</span>
      )}
      {!avatarOnly && name}
    </div>
  )
}

export default User
