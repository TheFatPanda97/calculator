import { useState } from 'react';
import { BsClockHistory } from 'react-icons/bs';
import classNames from 'classnames';
import { StaticMathField } from 'react-mathquill';

import type { FC } from 'react';
import './index.scss';

interface IProps {
  answer: string;
}

const AnswerDisplay: FC<IProps> = ({ answer }) => {
  const [showHistory, setShowHistory] = useState(false);

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
          <div className="past-equation-container">
            <StaticMathField className="past-equation">
              {'\\frac{1}{\\sqrt{2}}\\cdot 2'}
            </StaticMathField>
            =<div className="past-answer">56456465456456</div>
            <div className="past-variables">x = 3, y = 10</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AnswerDisplay;
