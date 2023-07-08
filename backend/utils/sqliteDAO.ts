import * as sqlite3 from 'sqlite3';

const core = sqlite3.verbose();
export const db = new core.Database('./db/calculator.db');

import type { Response } from 'express';

export const insertEquation = (
  res: Response,
  latex: string,
  answer: string,
  assignments: Record<string, number | ''>,
) =>
  db.run(
    `INSERT INTO calculations(latex, answer, assignments) VALUES(?, ?, ?)`,
    [latex, answer, JSON.stringify(assignments)],
    (err) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        res.send('Equation Added');
      }
    },
  );

export const getEquations = (res: Response) => {
  interface IROW {
    latex: string;
    answer: string;
    assignments: string;
  }

  db.all(
    `SELECT latex, answer, assignments FROM calculations ORDER BY created_at DESC`,
    (err, rows: IROW[]) => {
      if (err) {
        console.error(err);
        res.sendStatus(500);
      } else {
        const equations = rows.map((row) => ({
          latex: row.latex,
          answer: row.answer,
          assignments: JSON.parse(row.assignments),
        }));

        res.send(equations);
      }
    },
  );
};
