import request from 'supertest';
import server from '../index';
import * as sqliteDAO from '../utils/sqliteDAO';
import * as postgresDAO from '../utils/postgresDAO';

import type { Response } from 'express';

jest.mock('../utils/sqliteDAO');
jest.mock('../utils/postgresDAO');

describe('sqlite /equations endpoint', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      DB_TYPE: 'sqlite3',
      NODE_ENV: 'development',
    };
  });

  it('/GET should return 200 & list of past equations', (done) => {
    (sqliteDAO.getEquations as jest.Mock).mockImplementation((res: Response) => {
      res.send([{ answer: '5', assignments: { x: 2 }, latex: '2x + 1' }]);
    });

    request(server)
      .get(`/equations`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject([{ answer: '5', assignments: { x: 2 }, latex: '2x + 1' }]);
        done();
      });
  });

  it('/POST should return 200 & valid response if request param are correct', (done) => {
    (sqliteDAO.insertEquation as jest.Mock).mockImplementation((res: Response) => {
      res.send('Equation Added');
    });

    request(server)
      .post(`/equations`)
      .send({
        latex: '3+5',
        answer: 8,
        assignments: {},
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBe('Equation Added');
        done();
      });
  });

  it('/POST should return 400 & valid response if request param are missing values', (done) => {
    (sqliteDAO.insertEquation as jest.Mock).mockImplementation((res: Response) => {
      res.send('Equation Added');
    });

    request(server)
      .post(`/equations`)
      .send({
        // latex: '3+5', // missing latex
        answer: 8,
        assignments: {},
      })
      .expect(400)
      .end(done);
  });
});

describe('postgres /equations endpoint', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = {
      DB_TYPE: 'postgres',
      NODE_ENV: 'development',
      DB_HOST: 'disney',
      DB_NAME: 'marvel',
      DB_USER: 'john_wick',
      DB_PASSWD: 'I love my dog',
    };
  });

  it('/GET should return 200 & list of past equations', (done) => {
    (postgresDAO.getEquations as jest.Mock).mockImplementation(() => [
      { answer: '5', assignments: { x: 2 }, latex: '2x + 1' },
    ]);

    request(server)
      .get(`/equations`)
      .expect('Content-Type', /json/)
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.body).toMatchObject([{ answer: '5', assignments: { x: 2 }, latex: '2x + 1' }]);
        done();
      });
  });

  it('/POST should return 200 & valid response if request param are correct', (done) => {
    (postgresDAO.getEquations as jest.Mock).mockImplementation(() => {});

    request(server)
      .post(`/equations`)
      .send({
        latex: '3+5',
        answer: 8,
        assignments: {},
      })
      .expect(200)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.text).toBe('Equation Added');
        done();
      });
  });

  it('/POST should return 400 & valid response if request param are missing values', (done) => {
    (postgresDAO.getEquations as jest.Mock).mockImplementation(() => {});

    request(server)
      .post(`/equations`)
      .send({
        // latex: '3+5', // missing latex
        answer: 8,
        assignments: {},
      })
      .expect(400)
      .end(done);
  });
});
