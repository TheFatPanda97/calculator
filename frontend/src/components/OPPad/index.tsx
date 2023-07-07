import type { FC } from 'react';
import './index.scss';

import type { MutableRefObject } from 'react';
import type { MathField } from 'react-mathquill';

interface IProps {
  mathQullRef: MutableRefObject<MathField | null>;
  setLatex: (latex: string) => void;
  setText: (text: string) => void;
}

const OPPad: FC<IProps> = ({ mathQullRef, setLatex, setText }) => {
  const execute = (cmd: string) => mathQullRef.current?.cmd(cmd);
  return (
    <div className="op-pad">
      <button className="left-bracket">
        <p>(</p>
      </button>
      <button className="right-bracket">
        <p>)</p>
      </button>
      <button
        className="clear"
        onClick={() => {
          setLatex('');
          setText('');
        }}
      >
        <p>clear</p>
      </button>
      <button onClick={() => execute('7')}>
        <p>7</p>
      </button>
      <button>
        <p>8</p>
      </button>
      <button>
        <p>9</p>
      </button>
      <button onClick={() => execute('/')}>
        <p>÷</p>
      </button>
      <button>
        <p>4</p>
      </button>
      <button>
        <p>5</p>
      </button>
      <button>
        <p>6</p>
      </button>
      <button>
        <p>x</p>
      </button>
      <button>
        <p>1</p>
      </button>
      <button>
        <p>2</p>
      </button>
      <button>
        <p>3</p>
      </button>
      <button>
        <p>-</p>
      </button>
      <button>
        <p>0</p>
      </button>
      <button>
        <p>.</p>
      </button>
      <button>
        <p>=</p>
      </button>
      <button>
        <p>+</p>
      </button>
    </div>
  );
};

export default OPPad;
