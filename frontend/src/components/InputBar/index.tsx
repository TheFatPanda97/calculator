import { useState } from 'react';
import { EditableMathField } from 'react-mathquill';

import type { FC } from 'react';
import './index.scss';

const InputBar: FC = () => {
  const [latex, setLatex] = useState('\\frac{1}{\\sqrt{2}}\\cdot 2');
  const [text, setText] = useState('');

  return (
    <div className="input-bar">
      <EditableMathField
        latex={latex}
        onChange={(mathField) => {
          setLatex(mathField.latex());
          setText(mathField.text());
        }}
      />
      <div className="go-btn">
        <p>Go</p>
      </div>
    </div>
  );
};

export default InputBar;
