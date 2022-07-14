import { fireEvent, render, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Wizard from '.'
import { QuestionT } from '../../context/QuestionProvider'
import { UserT } from '../../context/types'
import questions from '../../mocks/questions.json'
import users from '../../mocks/people.json'

const submit = jest.fn()
const user = users[0] as UserT

/**
 * Returns a <Wizard /> with the provided props.
 * Also returns some utilities like the next and previous buttons.
 */
const wizardFactory = (q = questions as QuestionT[], u = user, s = submit) => {
  const wrapper = render(<Wizard questions={q} user={u} submit={s} />)

  return {
    wizard: wrapper,
    next: wrapper.getByText(/Next/i),
    previous: wrapper.getByText(/Previous/i),
  }
}

describe('Wizard component', () => {
  it('displays the first question', async () => {
    const { wizard } = wizardFactory()

    wizard.getByText(questions[0].label)
  })

  it('displays the name of the user receiving feedback', async () => {
    const { wizard } = wizardFactory()

    await wizard.findByText(new RegExp(user.name))
  })

  it('can select an answer and click next to go to the next question', async () => {
    const { wizard, next } = wizardFactory()

    const rating = wizard.getByLabelText('Rating 1')

    fireEvent.click(rating)
    fireEvent.click(next)

    expect(rating).not.toBeInTheDocument()
  })

  it('can go back to the previous question', async () => {
    const { wizard, next, previous } = wizardFactory()

    const rating = wizard.getByLabelText('Rating 1')

    fireEvent.click(rating)
    fireEvent.click(next)

    expect(wizard.queryByLabelText('Rating 1')).not.toBeInTheDocument()

    fireEvent.click(previous)

    expect(wizard.queryByLabelText('Rating 1')).toBeInTheDocument()
  })

  it('can fill a text area and go to the next question', async () => {
    const onlyTextArea = [questions[3], questions[4]] as QuestionT[]

    const { wizard, next } = wizardFactory(onlyTextArea)

    await waitFor(async () => {
      await fireEvent.change(wizard.getByPlaceholderText('Say something'), {
        target: { value: 'adsfadfadgagbdfgagd' },
      })

      fireEvent.click(next)

      wizard.getByText(new RegExp(onlyTextArea[1].label))

      expect(
        wizard.queryByText(new RegExp(onlyTextArea[0].label)),
      ).not.toBeInTheDocument()
    })
  })

  it('can skip a question if not required', async () => {
    const onlyTextArea = [questions[3], questions[4]] as QuestionT[]

    const { wizard } = wizardFactory(onlyTextArea)

    const skip = wizard.getByText(/Skip/i)
    fireEvent.click(skip)

    await waitFor(async () => {
      wizard.getByText(new RegExp(onlyTextArea[1].label))

      expect(
        wizard.queryByText(new RegExp(onlyTextArea[0].label)),
      ).not.toBeInTheDocument()
    })
  })
})
