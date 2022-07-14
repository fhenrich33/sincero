import { createContext, ReactNode, useReducer } from 'react'
import { UserT } from './types'

type DispatchUserContextT = any

export const DispatchUserContext = createContext<DispatchUserContextT | null>(
  null,
)
export const UserContext = createContext<UserT[] | null>(null)

type SetUsersT = {
  action: 'set'
  payload: UserT[]
}

const reducer = (state: UserT[] | null, update: SetUsersT): UserT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: ReactNode }): any => {
  const [state, dispatch] = useReducer(reducer, [])

  console.log('users', state)

  return (
    <DispatchUserContext.Provider value={dispatch}>
      <UserContext.Provider value={state}>{children}</UserContext.Provider>
    </DispatchUserContext.Provider>
  )
}

export default UIProvider
