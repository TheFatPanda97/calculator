import type { FC } from 'react';
import './index.scss';

interface IProps {
  answer: string;
}

const AnswerDisplay: FC<IProps> = ({ answer }) => {
  return (
    <div className="answer-display">
      {!answer.includes('Invalid Input') && <span>Answer:&nbsp;</span>}
      <p>{answer}</p>
    </div>
  );
};

export default AnswerDisplay;
