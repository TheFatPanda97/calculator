import { useState, useEffect } from 'react';
import { EditableMathField } from 'react-mathquill';
import { findVariables } from '../../utils/regex';
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
  setVariables: (variables: string[]) => void;
  mathQullRef: MutableRefObject<MathField | null>;
  calculateExpression: (mathField?: MathField) => void;
}

const InputBar: FC<IProps> = ({
  latex,
  text,
  variables,
  setLatex,
  setText,
  setVariables,
  mathQullRef,
  calculateExpression,
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
            if (mathField) {
              setLatex(mathField.latex());
              setText(mathField.text());
              setVariables(findVariables(mathField.text()));
            }
          }}
          onBlur={() => {
            setEditabledFieldFocused(false);
          }}
          onFocus={() => {
            setEditabledFieldFocused(true);
          }}
          config={{
            handlers: {
              enter: calculateExpression,
            },
          }}
        />
        <div className="go-btn" onClick={() => calculateExpression()}>
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
