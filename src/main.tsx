import './index.module.css'
import { worker } from './mocks/browser'
import App from './App'
import { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import UserProvider from './context/UserProvider'
import QuestionProvider from './context/QuestionProvider'
import FeedbackProvider from './context/FeedbackProvider'
import AccountProvider from './context/AccountProvider'

// TODO: add reportWebVitals?

worker.start().then(() => {
  ReactDOM.render(
    <StrictMode>
      <AccountProvider>
        <UserProvider>
          <QuestionProvider>
            <FeedbackProvider>
              <App />
            </FeedbackProvider>
          </QuestionProvider>
        </UserProvider>
      </AccountProvider>
    </StrictMode>,
    document.getElementById('root'),
  )
})
