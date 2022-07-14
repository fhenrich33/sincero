import { useContext } from 'react'
import Feedback from '../../components/Feedback'
import NoFeedback from '../../components/NoFeedback'
import { AccountContext } from '../../context/AccountProvider'
import { FeedbackContext } from '../../context/FeedbackProvider'
import { QuestionContext } from '../../context/QuestionProvider'
import { UserContext } from '../../context/UserProvider'
import MainLayout from '../../layouts/MainLayout'

const TeamFeedback = () => {
  const currentUser = useContext(AccountContext)
  const users = useContext(UserContext)
  const feedback = useContext(FeedbackContext)
  const questions = useContext(QuestionContext)

  return (
    <MainLayout loggedIn>
      {currentUser && users?.length && feedback?.length && questions?.length ? (
        <Feedback
          feedbackDirection="to"
          currentUser={currentUser}
          feedback={feedback}
          users={users}
          questions={questions}
        />
      ) : (
        <NoFeedback />
      )}
    </MainLayout>
  )
}

export default TeamFeedback
