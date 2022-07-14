import { createContext, Dispatch, ReactNode, useReducer } from 'react'

export interface QuestionT {
  id: string
  type: 'scale' | 'text' | 'multipleChoice'
  required: boolean
  label: string
  options?: {
    label: string
    value: number
  }[]
}

type SetQuestionsT = {
  action: 'set'
  payload: QuestionT[]
}

export type DispatchQuestionContextT = Dispatch<SetQuestionsT>

export const DispatchQuestionContext =
  createContext<DispatchQuestionContextT | null>(null)
export const QuestionContext = createContext<QuestionT[] | null>(null)

const reducer = (
  state: QuestionT[] | null,
  update: SetQuestionsT,
): QuestionT[] | null => {
  if (update.action === 'set') {
    return update.payload
  }

  return state
}

const UIProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, [])
  console.log('questions', state)

  return (
    <DispatchQuestionContext.Provider value={dispatch}>
      <QuestionContext.Provider value={state}>
        {children}
      </QuestionContext.Provider>
    </DispatchQuestionContext.Provider>
  )
}

export default UIProvider
