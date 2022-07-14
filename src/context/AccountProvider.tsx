import { createContext, useReducer } from 'react'
import { UserT } from './types'

type LoginAccountT = {
  action: 'login'
  payload: UserT
}

type LogoutAccountT = {
  action: 'logout'
}

export type DispatchAccountContextT = React.Dispatch<
  LoginAccountT | LogoutAccountT
>

export const DispatchAccountContext =
  createContext<DispatchAccountContextT | null>(null)
export const AccountContext = createContext<UserT | null>(null)

const reducer = (
  state: UserT | null,
  update: LoginAccountT | LogoutAccountT,
): UserT | null => {
  if (update.action === 'login') {
    console.log('login ', state)
    return update.payload
  } else if (update.action === 'logout') {
    console.log('logout')
    return null
  }
  return state
}

const UIProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, null)

  console.log('account', state)

  return (
    <DispatchAccountContext.Provider value={dispatch}>
      <AccountContext.Provider value={state}>
        {children}
      </AccountContext.Provider>
    </DispatchAccountContext.Provider>
  )
}

export default UIProvider
