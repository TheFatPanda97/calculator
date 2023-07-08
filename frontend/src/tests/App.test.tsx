import { describe, test, expect, beforeAll, afterEach, afterAll } from 'vitest';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { setupServer } from 'msw/node';
import { handlers } from './mock';

import App from '../App';

const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  cleanup();
});
afterAll(() => server.close());

describe('<App />', () => {
  test('App mounts properly', () => {
    const wrapper = render(<App />);
    expect(wrapper).toBeTruthy();

    // Get by text using the React testing library
    const text = screen.getByText(/pretty calculator/i);
    expect(text.textContent).toBeTruthy();
  });

  test('Test Input Correctly Displays Equations', async () => {
    const { container } = render(<App />);

    await waitFor(async () => {
      const input = container.getElementsByTagName('textarea')[0];

      await userEvent.type(input, 'z');
    });

    const varZ = screen.getAllByText('z');
    expect(varZ).toBeTruthy();
  });

  test('Test Answer Is Correct', async () => {
    const { container } = render(<App />);

    await waitFor(async () => {
      const input = container.getElementsByTagName('textarea')[0];
      await userEvent.type(input, '(1+2)99');
    });

    const goButton = screen.getByText('Go');
    await userEvent.click(goButton);

    const answer = screen.getAllByText('297');
    expect(answer).toBeTruthy();
  });

  test('Test 1+2x = 101 (x=50)', async () => {
    const { container } = render(<App />);

    await waitFor(async () => {
      const input = container.getElementsByTagName('textarea')[0];
      await userEvent.type(input, '1+2x');
    });

    await waitFor(async () => {
      const variableInput = container.querySelector('input.variable-input');

      if (!variableInput) throw new Error('Variable input not found');

      await userEvent.type(variableInput, '{backspace}50');
    });

    const goButton = screen.getByText('Go');
    await userEvent.click(goButton);

    const answer = screen.getAllByText('101');
    expect(answer).toBeTruthy();
  });

  test('Test (1+2)4 = 12', async () => {
    const { container } = render(<App />);

    await waitFor(async () => {
      const input = container.getElementsByClassName('mq-editable-field')[0];
      await userEvent.click(input);
      await userEvent.type(input, ' (1+2)4)');
    });

    const goButton = screen.getByText('Go');
    await userEvent.click(goButton);

    const answer = screen.getAllByText('12');
    expect(answer).toBeTruthy();
  });

  test('Test = On Numpad Calculates', async () => {
    const { container } = render(<App />);

    await waitFor(async () => {
      const input = container.getElementsByClassName('mq-editable-field')[0];
      await userEvent.click(input);
      await userEvent.type(input, ' (1+2)4)');
    });

    const goButton = screen.getByText('=');
    await userEvent.click(goButton);

    const answer = screen.getAllByText('12');
    expect(answer).toBeTruthy();
  });
});
