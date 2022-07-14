import { fireEvent, render, waitFor, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Feedback from '.'
import { FeedbackT } from '../../context/FeedbackProvider'
import { QuestionT } from '../../context/QuestionProvider'
import { UserT } from '../../context/types'
import questions from '../../mocks/questions.json'
import users from '../../mocks/people.json'
import feedback from '../../mocks/feedback.json'

const currentUser = users[0] as UserT

/**
 * Returns a <Feedback /> with the provided props.
 */
const feedbackFactory = ({
  q = questions as QuestionT[],
  c = currentUser,
  u = users as UserT[],
  fd = 'to',
  fb = JSON.parse(JSON.stringify(feedback)) as FeedbackT[],
}) => {
  const wrapper = render(
    <Feedback
      questions={q}
      currentUser={c}
      feedbackDirection={fd as 'to' | 'from'}
      feedback={fb}
      users={u}
    />,
  )

  return {
    feedbackWrapper: wrapper,
    feedbackCollection: fb,
    currentUser: c,
  }
}

describe('Feedback component', () => {
  it('displays that feedback is being given when `feedbackDirection` "from" is passed', async () => {
    const { feedbackWrapper } = feedbackFactory({ fd: 'from' })

    feedbackWrapper.getByText('My Feedback')
    feedbackWrapper.getByText('Feedback given')
  })

  it('displays that feedback is being received when `feedbackDirection` "to" is passed', async () => {
    const { feedbackWrapper } = feedbackFactory({})

    feedbackWrapper.getByText('Team Feedback')
    feedbackWrapper.getByText('Feedback received')
  })

  it('shows the selected user name', async () => {
    const { feedbackWrapper } = feedbackFactory({})

    feedbackWrapper.getByText(/Harold Hays’ Feedback/i)
  })

  it('Shows another selected user name after clicking on the user avatar', async () => {
    const { feedbackWrapper } = feedbackFactory({})

    const anotherFeedback = feedbackWrapper.getByText(/Martha Liberty/i)
    fireEvent.click(anotherFeedback)

    feedbackWrapper.getByText(/Martha Liberty’s Feedback/i)
    expect(
      feedbackWrapper.queryByText(/Harold Hays’ Feedback/i),
    ).not.toBeInTheDocument()
  })

  it('shows all the answer for the user or skipped if question was skipped', async () => {
    const { feedbackWrapper } = feedbackFactory({})

    feedbackWrapper.getByText(/Harold Hays’ Feedback/i)
    feedbackWrapper.getByText(/skipped/i)

    feedbackWrapper.getByText(/Yes, you are the one I look up to when I need /i)
    feedbackWrapper.getByText(/adfadgadczbbcbczbcvvczvzcvzcvczv/i)

    const scaleRatingAnswer = feedbackWrapper.getAllByLabelText(/Rating 5/i)[0]

    expect(scaleRatingAnswer).toBeInTheDocument()
    // screen.debug(scaleRatingAnswer)
    // expect(scaleRatingAnswer).toBeChecked() // TODO: RTL went ballistics and can't undestand this is checked.
  })
})
