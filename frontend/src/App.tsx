import { useState, useRef } from 'react';
import { evaluate } from 'mathjs';
import { addMultiplicationSigns } from './utils/regex';
import InputBar from './components/InputBar';
import AnswerDisplay from './components/AnswerDisplay';
import OPPad from './components/OPPad';

import type { MathField } from 'react-mathquill';

const App = () => {
  const [latex, setLatex] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const mathQullRef = useRef<MathField | null>(null);

  const calculateExpression = (mathField?: MathField) => {
    try {
      const currText = mathField ? mathField.text() : text;
      const currAnswer = evaluate(addMultiplicationSigns(currText)) as string;

      if (typeof currAnswer !== 'number') {
        throw new Error('Invalid input');
      }

      setAnswer(currAnswer);
    } catch (_) {
      setAnswer('Invalid input');
    }
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <AnswerDisplay answer={answer} />
        <InputBar
          latex={latex}
          text={text}
          variables={variables}
          setLatex={setLatex}
          setText={setText}
          setVariables={setVariables}
          mathQullRef={mathQullRef}
          calculateExpression={calculateExpression}
        />
        <OPPad
          mathQullRef={mathQullRef}
          setLatex={setLatex}
          setText={setText}
          calculateExpression={calculateExpression}
        />
      </div>
    </div>
  );
};

export default App;
