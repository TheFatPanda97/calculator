import { useState, useRef, useEffect } from 'react';
import { evaluate } from 'mathjs';
import axios from 'axios';
import { addMultiplicationSigns, replaceVariables } from './utils/calculationUtils';
import TitleBar from './components/TitleBar';
import InputBar from './components/InputBar';
import AnswerDisplay from './components/AnswerDisplay';
import OPPad from './components/OPPad';
import VariableList from './components/VariableList';

import type { MathField } from 'react-mathquill';
import type { IHistory } from './components/AnswerDisplay';

interface IEquation {
  latex: string;
  answer: string;
  assignments: Record<string, number | ''>;
}

const App = () => {
  const [latex, setLatex] = useState('');
  const [text, setText] = useState('');
  const [answer, setAnswer] = useState('');
  const [variables, setVariables] = useState<string[]>([]);
  const mathQullRef = useRef<MathField | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, number | ''>>(
    variables.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {}),
  );
  const [history, setHistory] = useState<IHistory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get<IEquation[]>(`${import.meta.env.VITE_API_BASE_URL}/equations`);
        const equtaions = res.data;

        setHistory(
          equtaions.map(({ latex, answer, assignments }) => ({
            equationLatex: latex,
            answer,
            variables: assignments,
          })),
        );
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const calculateExpression = (mathField?: MathField) => {
    const currText = mathField ? mathField.text() : text;
    const addMultiplicationSignsString = addMultiplicationSigns(currText);
    const replaceVariablesString = replaceVariables(addMultiplicationSignsString, variableValues);
    let currAnswer;

    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      currAnswer = evaluate(replaceVariablesString);

      if (typeof currAnswer !== 'number') {
        throw new Error('Invalid input');
      }

      currAnswer = currAnswer.toString();
      setAnswer(currAnswer);
    } catch (_) {
      if (variables.length > 0) {
        currAnswer = 'Invalid Input (Missing variable values)';
        setAnswer('Invalid Input (Missing variable values)');
      } else {
        currAnswer = 'Invalid Input';
        setAnswer('Invalid Input');
      }
    }

    setHistory([
      {
        equationLatex: latex,
        answer: currAnswer,
        variables: variableValues,
      },
      ...history,
    ]);
  };

  return (
    <div className="app">
      <div className="calculator-container">
        <TitleBar />
        <AnswerDisplay
          answer={answer}
          history={history}
          setLatex={setLatex}
          setVariableValues={setVariableValues}
          setAnswer={setAnswer}
        />
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
