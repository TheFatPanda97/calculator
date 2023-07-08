// mocks.js
import { rest } from 'msw';

export const handlers = [
  rest.get('/equations', (_, res, ctx) => {
    return res(ctx.json([]));
  }),
  rest.post('/equations', (_, res) => {
    return res();
  }),
];
