import classNames from 'classnames';

import './index.scss';

import type { FC } from 'react';
import type { MutableRefObject } from 'react';
import type { MathField } from 'react-mathquill';

interface IProps {
  mathQullRef: MutableRefObject<MathField | null>;
  setLatex: (latex: string) => void;
  setText: (text: string) => void;
  calculateExpression: (mathField?: MathField) => void;
}

const OPPad: FC<IProps> = ({ mathQullRef, setLatex, setText, calculateExpression }) => {
  const execute = (cmd: string) => mathQullRef.current?.cmd(cmd);
  const numpad = [
    { value: '(', cmd: '(' },
    { value: ')', cmd: ')' },
    { value: '7', cmd: '7' },
    { value: '8', cmd: '8' },
    { value: '9', cmd: '9' },
    { value: '÷', cmd: '/' },
    { value: '4', cmd: '4' },
    { value: '5', cmd: '5' },
    { value: '6', cmd: '6' },
    { value: 'x', cmd: '*' },
    { value: '1', cmd: '1' },
    { value: '2', cmd: '2' },
    { value: '3', cmd: '3' },
    { value: '-', cmd: '-' },
    { value: '0', cmd: '0' },
    { value: '.', cmd: '.' },
    { value: '=', cmd: calculateExpression },
    { value: '+', cmd: '+' },
  ];

  return (
    <div className="op-pad">
      <button
        className="clear"
        onClick={() => {
          setLatex('');
          setText('');
        }}
      >
        <p>clear</p>
      </button>
      {numpad.map(({ value, cmd }) => (
        <button
          className={classNames({
            'left-bracket': value === '(',
            'right-bracket': value === ')',
          })}
          key={value}
          onClick={() => {
            if (typeof cmd === 'string') {
              execute(cmd);
            } else {
              console.log('hehe');
              cmd();
            }
          }}
        >
          <p>{value}</p>
        </button>
      ))}
    </div>
  );
};

export default OPPad;
