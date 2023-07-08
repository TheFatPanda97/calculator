// mocks.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/equations', (req, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post('/equations', (req, res, ctx) => {
    return res();
  }),
];
