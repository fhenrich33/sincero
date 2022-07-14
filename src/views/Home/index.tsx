import { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom'
import Button from '../../components/Button'
import MainLayout from '../../layouts/MainLayout'
import Select from 'react-select'
import styles from './home.module.css'
import {
  AccountContext,
  DispatchAccountContext,
} from '../../context/AccountProvider'
import { UserContext } from '../../context/UserProvider'
import { UserT } from '../../context/types'

const Home = () => {
  const currentUser = useContext(AccountContext)
  const accountDispatch = useContext(DispatchAccountContext)
  const allUsers = useContext(UserContext)
  const [selectedUser, setUserForLogin] = useState<UserT | null>()

  if (currentUser !== null) return <Redirect to="/share-feedback" />
  if (!accountDispatch) throw new Error()

  return (
    <MainLayout className={styles.background}>
      <div className={styles.wrapper}>
        <div className={styles.loginBox}>
          <p className={styles.logo}>s</p>
          <h1 className={styles.heading}>Sincero</h1>
          <div className={styles.loginAs}>
            <label htmlFor="loginNames">Login as:</label>
            <Select<UserT>
              id="loginNames"
              options={allUsers!!}
              getOptionLabel={(user: UserT) => user.name}
              getOptionValue={(user: UserT) => user.id}
              value={selectedUser}
              onChange={setUserForLogin}
            />
          </div>
          <div>
            <Button
              disabled={!selectedUser}
              onClick={() => {
                if (selectedUser)
                  accountDispatch({
                    action: 'login',
                    payload: selectedUser,
                  })
              }}
            >
              Login
            </Button>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Home
