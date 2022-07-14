import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export interface FeedbackT {
  to: string
  from: string
  answers: Record<string, string>[]
}

type SetFeedbackT = {
  action: 'set'
  payload: FeedbackT
}

export type AnswerT = FeedbackT['answers'][0]

export type DispatchFeedbackContextT = Dispatch<SetFeedbackT>

export const DispatchFeedbackContext =
  createContext<DispatchFeedbackContextT | null>(null)
export const FeedbackContext = createContext<FeedbackT[] | null>(null)

const reducer = (
  state: FeedbackT[] | null,
  update: SetFeedbackT,
): FeedbackT[] | null => {
  if (update.action === 'set') {
    return state ? [...state, update.payload] : [update.payload]
  }

  return state
}

const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])
  console.log('feedback', state)

  return (
    <DispatchFeedbackContext.Provider value={dispatch}>
      <FeedbackContext.Provider value={state}>
        {children}
      </FeedbackContext.Provider>
    </DispatchFeedbackContext.Provider>
  )
}

export default UIProvider
