import 'dotenv/config';
import express from 'express';
import {
  insertEquation as insertEquationLite,
  getEquations as getEquationsLite,
} from './util/sqliteDAO';

import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (_, res: Response) => {
  res.send('Pretty Calculator API');
});

app.get('/equations', (_, res: Response) => {
  if (process.env.DB_TYPE === 'sqlite3') {
    getEquationsLite(res);
  }
});

app.post('/equations', (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const { latex, answer, assignments } = req.body;

  if (!latex || !answer || !assignments) {
    return res.sendStatus(400);
  }

  if (process.env.DB_TYPE === 'sqlite3') {
    insertEquationLite(res, latex, answer, assignments);
  }
});

app.listen(port, () => {
  console.log(`⚡️[Calculator API] is running on port ${port}`);
});
