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
  const mathQullRef = useRef<MathField | null>(null);
  const [variableValues, setVariableValues] = useState<Record<string, number | ''>>({});
  const [history, setHistory] = useState<IHistory[]>([]);

  // retrieve history from backend
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
        setAnswer(equtaions[0].answer);
        setVariableValues(equtaions[0].assignments);
        setLatex(equtaions[0].latex);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  const calculateExpression = async (mathField?: MathField) => {
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
      if (Object.keys(variableValues).length > 0) {
        currAnswer = 'Invalid Input (Missing Variable Values?)';
        setAnswer('Invalid Input (Missing Variable Values?)');
      } else {
        currAnswer = 'Invalid Input';
        setAnswer('Invalid Input');
      }
    }

    try {
      await axios.post(`${import.meta.env.VITE_API_BASE_URL}/equations`, {
        latex,
        answer: currAnswer,
        assignments: variableValues,
      });
    } catch (error) {
      console.error(error);
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
          variableValues={variableValues}
          setLatex={setLatex}
          setText={setText}
          setVariableValues={setVariableValues}
          mathQullRef={mathQullRef}
          calculateExpression={calculateExpression}
        />
        <OPPad
          mathQullRef={mathQullRef}
          setLatex={setLatex}
          setText={setText}
          calculateExpression={calculateExpression}
        />
        <VariableList variableValues={variableValues} setVariableValues={setVariableValues} />
      </div>
    </div>
  );
};

export default App;
