import type { FC } from 'react';
import './index.scss';

interface IProps {
  answer: string;
}

const AnswerDisplay: FC<IProps> = ({ answer }) => {
  console.log(answer);

  return (
    <div className="answer-display">
      <p>Answer: {answer}</p>
    </div>
  );
};

export default AnswerDisplay;
