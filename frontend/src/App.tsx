import { useState, useRef } from 'react';
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

  return (
    <div className="app">
      <div className="calculator-container">
        <AnswerDisplay answer={answer} />
        <InputBar
          latex={latex}
          text={text}
          variables={variables}
          setLatex={setLatex}
          setAnswer={setAnswer}
          setText={setText}
          setVariables={setVariables}
          mathQullRef={mathQullRef}
        />
        <OPPad mathQullRef={mathQullRef} setLatex={setLatex} setText={setText} />
      </div>
    </div>
  );
};

export default App;
