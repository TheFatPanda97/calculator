import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import classNames from 'classnames';
import { StaticMathField } from 'react-mathquill';

import type { FC } from 'react';
import './index.scss';

interface IProps {
  answer: string;
  history: IHistory[];
  setLatex: (latex: string) => void;
  setVariableValues: (variableValues: Record<string, number | ''>) => void;
  setAnswer: (answer: string) => void;
}

export interface IHistory {
  equationLatex: string;
  answer: string;
  variables: Record<string, number | ''>;
}

const AnswerDisplay: FC<IProps> = ({ answer, history, setLatex, setVariableValues, setAnswer }) => {
  const [showHistory, setShowHistory] = useState(false);

  const onEquationClick = (
    equationLatex: string,
    variables: Record<string, number | ''>,
    answer: string,
  ) => {
    setLatex(equationLatex);
    setVariableValues(variables);
    setAnswer(answer);
    setShowHistory(false);
  };

  return (
    <div
      className={classNames('answer-display-container', {
        'answer-display-container--expanded': showHistory,
      })}
    >
      <div className="answer-display">
        <div className="answer-container">
          {!answer.includes('Invalid Input') && <span>Answer:&nbsp;</span>}
          <p>{answer}</p>
        </div>
        <div className="history-btn" onClick={() => setShowHistory(!showHistory)}>
          <BsClockHistory />
        </div>
      </div>
      {showHistory && (
        <div className="history-container">
          <hr />
          {history.map(({ equationLatex, answer, variables }, index) => (
            <div
              key={`${equationLatex}-${index}`}
              className="past-equation-container"
              onClick={() => onEquationClick(equationLatex, variables, answer)}
            >
              <StaticMathField className="past-equation">{equationLatex}</StaticMathField>=
              <div className="past-answer">{answer}</div>
              {Object.entries(variables).length > 0 && (
                <div className="past-variables">
                  {Object.entries(variables)
                    .map(([variable, value]) => `${variable} = ${value}`)
                    .join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
