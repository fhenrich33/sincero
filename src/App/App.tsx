import { useContext, useEffect } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { DispatchUserContext } from '../context/UserProvider'
import {
  DispatchQuestionContext,
  DispatchQuestionContextT,
} from '../context/QuestionProvider'
import Components from '../views/Components'
import ErrorHandler from './ErrorHandler'
import GiveFeedback from '../views/GiveFeedback'
import Home from '../views/Home'
import http from '../common/http'
import NotFound from '../views/NotFound'
import ReviewFeedback from '../views/ReviewFeedback'
import TeamFeedback from '../views/TeamFeedback'
import { AccountContext } from '../context/AccountProvider'
import PrivateRoute from '../components/Routing/PrivateRoute'

const PRIVATE_ROUTES = {
  "/my-feedback": <ReviewFeedback />,
  "/share-feedback": <GiveFeedback />,
  "/team-feedback": <TeamFeedback />,
  "/components": <Components />,
}

const App = () => {
  const currentUser = useContext(AccountContext)
  const userDispatch = useContext(DispatchUserContext)
  const questionDispatch = useContext(
    DispatchQuestionContext
  )
  const isLoggedIn = currentUser != null

  useEffect(() => {
    Promise.all([http.get('questions'), http.get('people')]).then(
      ([questions, people]) => {
        userDispatch({
          action: 'set',
          payload: people,
        })

        questionDispatch && questionDispatch({
          action: 'set',
          payload: questions,
        })
      },
    )
  }, [])

  return (
    <BrowserRouter>
      <ErrorHandler>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          {Object.entries(PRIVATE_ROUTES).map(([route, component]) => (
            <PrivateRoute isLoggedIn={isLoggedIn} exact path={route}>
              {component}
            </PrivateRoute>
          ))}
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </ErrorHandler>
    </BrowserRouter >
  )
}

export default App
