import { EditableMathField } from 'react-mathquill';
import * as math from 'mathjs';
import { findVariables } from '../../utils/regex';

import type { FC } from 'react';
import './index.scss';

interface IProps {
  latex: string;
  text: string;
  answer: string;
  variables: string[];
  setLatex: (latex: string) => void;
  setText: (text: string) => void;
  setAnswer: (answer: string) => void;
  setVariables: (variables: string[]) => void;
}

const InputBar: FC<IProps> = ({
  latex,
  text,
  answer,
  variables,
  setLatex,
  setAnswer,
  setText,
  setVariables,
}) => {
  return (
    <>
      <div className="input-bar">
        <EditableMathField
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex());
            setText(mathField.text());
            setVariables(findVariables(mathField.text()));
          }}
        />
        <div
          className="go-btn"
          onClick={() => {
            try {
              // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
              const currAnswer = math.evaluate(text) as string;
              setAnswer(currAnswer);
            } catch (error) {
              setAnswer('Invalid input');
            }
          }}
        >
          <p>Go</p>
        </div>
      </div>
      <div>
        <p>Latex: {latex}</p>
        <p>Text: {text}</p>
        <p>Answer: {answer}</p>
        <p>Variables: {variables.join(', ')}</p>
      </div>
    </>
  );
};

export default InputBar;
