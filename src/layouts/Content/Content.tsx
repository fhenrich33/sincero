import styles from './content.module.css'
import classnames from 'classnames'

type Props = {
  children: React.ReactNode
}

const Content = ({ children }: Props) => (
  <main className={classnames(styles.content)}>{children}</main>
)

export default Content
