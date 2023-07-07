import { useState } from 'react';
import InputBar from './components/InputBar';
import OPPad from './components/OPPad';

const App = () => {
  const [latex, setLatex] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [variables, setVariables] = useState<string[]>([]);

  return (
    <div className="app">
      <div className="calculator-container">
        <InputBar
          latex={latex}
          text={text}
          answer={answer}
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
