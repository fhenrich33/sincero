import { rest } from 'msw'
import questions from './questions.json'
import people from './people.json'

export const handlers = [
  rest.get('/questions', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(questions))
  }),

  rest.get('/people', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(people))
  }),
]
