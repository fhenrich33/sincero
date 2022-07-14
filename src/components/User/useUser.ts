import { useCallback } from 'react'
import { UserT } from '../../context/types'

type Deps = {
  users: UserT[]
}

/**
 * User hook to abstract and manipulate user data
 */
export default function useQuestion(deps: Deps) {
  const { users } = deps

  const getTargetUser = useCallback(
    (id: string) => users.find((user) => user.id === id),
    [users],
  )

  return {
    getTargetUser,
  }
}
