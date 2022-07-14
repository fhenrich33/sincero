import { useContext } from 'react'
import { NavLink } from 'react-router-dom'
import styles from './header.module.css'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import User from '../../components/User'

const Header = () => {
  const currentUser = useContext(AccountContext)
  const logoutUser = useContext(DispatchAccountContext)

  console.log('current user', currentUser)

  if (!logoutUser) throw new Error()

  const handleLogout = () => {
    logoutUser({ action: 'logout' })
  }

  return (
    <nav className={styles.header}>
      <p className={styles.logo}>Sincero</p>
      <NavLink
        exact
        to="/share-feedback"
        className={styles.navItem}
        activeClassName={styles.active}
      >
        Share Feedback
      </NavLink>
      <NavLink
        exact
        to="/my-feedback"
        className={styles.navItem}
        activeClassName={styles.active}
      >
        My Feedback
      </NavLink>
      <NavLink
        exact
        to="/team-feedback"
        className={styles.navItem}
        activeClassName={styles.active}
      >
        Team Feedback
      </NavLink>
      <span className={styles.spacer} />
      <div role="none" className={styles.avatar}>
        {currentUser && (
          <User
            name={currentUser.name}
            avatarUrl={currentUser.avatarUrl}
            avatarOnly
          />
        )}
        <div role="none" className={styles.avatarText}>
          <span className={styles.userName}>{currentUser?.name ?? ''}</span>
          <NavLink
            exact
            to="/"
            onClick={handleLogout}
            className={styles.logout}
          >
            Logout
          </NavLink>
        </div>
      </div>
    </nav>
  )
}
export default Header
