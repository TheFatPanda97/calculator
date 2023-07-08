import { Client } from 'pg';
import type { Response } from 'express';

const db = new Client({
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWD,
  ssl: true,
});

export const connectDB = async () => {
  await db.connect();
};

export const insertEquation = (
  latex: string,
  answer: string,
  assignments: Record<string, number | ''>,
) =>
  db.query('INSERT INTO calculations(latex, answer, assignments) VALUES($1, $2, $3)', [
    latex,
    answer,
    JSON.stringify(assignments),
  ]);

export const getEquations = async () => {
  interface IROW {
    latex: string;
    answer: string;
    assignments: string;
  }

  const res = await db.query<IROW>(
    'SELECT latex, answer, assignments FROM calculations ORDER BY created_at DESC',
  );

  return res.rows.map((row) => ({
    latex: row.latex,
    answer: row.answer,
    assignments: JSON.parse(row.assignments),
  }));
};
