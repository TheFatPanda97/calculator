import { useState } from 'react';
import InputBar from './components/InputBar';
import AnswerDisplay from './components/AnswerDisplay';
import OPPad from './components/OPPad';

const App = () => {
  const [latex, setLatex] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [variables, setVariables] = useState<string[]>([]);

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
        />
        {/* <OPPad /> */}
      </div>
    </div>
  );
};

export default App;
