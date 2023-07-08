import 'dotenv/config';
import express from 'express';
import {
  insertEquation as insertEquationLite,
  getEquations as getEquationsLite,
} from './util/sqliteDAO';
import {
  insertEquation as insertEquationPg,
  getEquations as getEquationsPg,
  connectDB,
} from './util/postgresDAO';

import type { Express, Request, Response } from 'express';

const app: Express = express();
const port = 3000;

app.use(express.json());

app.get('/', (_, res: Response) => {
  res.send('Pretty Calculator API');
});

app.get('/equations', async (_, res: Response) => {
  if (process.env.DB_TYPE === 'sqlite3') {
    getEquationsLite(res);
  } else if (process.env.DB_TYPE === 'postgres') {
    try {
      const rows = await getEquationsPg();
      res.send(rows);
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
});

app.post('/equations', async (req: Request, res: Response) => {
  if (!req.body) return res.sendStatus(400);

  const { latex, answer, assignments } = req.body;

  if (!latex || !answer || !assignments) {
    return res.sendStatus(400);
  }

  if (process.env.DB_TYPE === 'sqlite3') {
    insertEquationLite(res, latex, answer, assignments);
  } else if (process.env.DB_TYPE === 'postgres') {
    try {
      await insertEquationPg(latex, answer, assignments);
      res.send('Equation Added');
    } catch (error) {
      console.error(error);
      res.sendStatus(500);
    }
  } else {
    res.sendStatus(500);
  }
});

if (process.env.DB_TYPE === 'postgres') {
  connectDB().then(() => {
    app.listen(port, () => {
      console.log(`⚡️[Calculator API] is running on port ${port}`);
    });
  });
} else {
  app.listen(port, () => {
    console.log(`⚡️[Calculator API] is running on port ${port}`);
  });
}
