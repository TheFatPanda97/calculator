import { useState, useRef } from 'react';
import { evaluate } from 'mathjs';
import { addMultiplicationSigns, replaceVariables } from './utils/calculationUtils';
import TitleBar from './components/TitleBar';
import InputBar from './components/InputBar';
import AnswerDisplay from './components/AnswerDisplay';
import OPPad from './components/OPPad';
import VariableList from './components/VariableList';

import type { MathField } from 'react-mathquill';

const App = () => {
  const [latex, setLatex] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const mathQullRef = useRef<MathField | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, number | ''>>(
    variables.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {}),
  );

  const calculateExpression = (mathField?: MathField) => {
    try {
      const currText = mathField ? mathField.text() : text;
      const addMultiplicationSignsString = addMultiplicationSigns(currText);
      const replaceVariablesString = replaceVariables(addMultiplicationSignsString, variableValues);
      const currAnswer = evaluate(replaceVariablesString) as string;

      if (typeof currAnswer !== 'number') {
        throw new Error('Invalid input');
      }

      setAnswer(currAnswer);
    } catch (_) {
      let errorMsg = 'Invalid input';

      if (variables.length > 0) {
        errorMsg += ' (are you missing some value assignments?)';
      }

      setAnswer(errorMsg);
    }
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <TitleBar />
        <AnswerDisplay answer={answer} />
        <InputBar
          latex={latex}
          text={text}
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
        <VariableList
          variables={variables}
          variableValues={variableValues}
          setVariableValues={setVariableValues}
        />
      </div>
    </div>
  );
};

export default App;
