import { useState, useEffect } from 'react';
import { EditableMathField } from 'react-mathquill';
import { evaluate } from 'mathjs';
import { findVariables, addMultiplicationSigns } from '../../utils/regex';
import classNames from 'classnames';

import type { FC, MutableRefObject } from 'react';
import type { MathField } from 'react-mathquill';
import './index.scss';

interface IProps {
  latex: string;
  text: string;
  variables: string[];
  setLatex: (latex: string) => void;
  setText: (text: string) => void;
  setAnswer: (answer: string) => void;
  setVariables: (variables: string[]) => void;
  mathQullRef: MutableRefObject<MathField | null>;
}

const InputBar: FC<IProps> = ({
  latex,
  text,
  variables,
  setLatex,
  setAnswer,
  setText,
  setVariables,
  mathQullRef,
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [editabledFieldFocused, setEditabledFieldFocused] = useState(false);

  useEffect(() => {
    setShowPlaceholder(text === '' && !editabledFieldFocused);
  }, [text, editabledFieldFocused]);

  return (
    <>
      <div className="input-bar">
        <span
          className={classNames('placeholder', {
            'placeholder--hidden': !showPlaceholder,
          })}
          onClick={() => {
            mathQullRef.current?.focus();
          }}
        >
          Enter a problem:
        </span>
        <EditableMathField
          mathquillDidMount={(mathField) => {
            mathQullRef.current = mathField;
          }}
          latex={latex}
          onChange={(mathField) => {
            setLatex(mathField.latex());
            setText(mathField.text());
            setVariables(findVariables(mathField.text()));
          }}
          onBlur={() => {
            setEditabledFieldFocused(false);
          }}
          onFocus={() => {
            setEditabledFieldFocused(true);
          }}
        />
        <div
          className="go-btn"
          onClick={() => {
            try {
              const currAnswer = evaluate(addMultiplicationSigns(text)) as string;

              if (typeof currAnswer !== 'number') {
                throw new Error('Invalid input');
              }

              setAnswer(currAnswer);
            } catch (_) {
              setAnswer('Invalid input');
            }
          }}
        >
          <p>Go</p>
        </div>
      </div>
      <div>
        <p>Latex: {latex}</p>
        <p>Text: {text}</p>
        <p>Variables: {variables.join(', ')}</p>
      </div>
    </>
  );
};

export default InputBar;
