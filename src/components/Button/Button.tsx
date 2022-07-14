import classnames from 'classnames'
import styles from './button.module.css'

type Props = React.ButtonHTMLAttributes<any> & {
  primary?: boolean
  secondary?: boolean
  transparent?: boolean
}

const Button = ({
  children,
  primary,
  secondary,
  transparent,
  className,
  ...rest
}: Props) => (
  <button
    className={classnames(styles.button, className, {
      [styles.primaryButton]: primary,
      [styles.secondaryButton]: secondary,
      [styles.transparentButton]: transparent,
    })}
    {...rest}
  >
    {children}
  </button>
)

export default Button
