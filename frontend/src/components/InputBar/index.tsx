import { useState, useEffect } from 'react';
import { EditableMathField } from 'react-mathquill';
import { findVariables } from '../../utils/calculationUtils';
import classNames from 'classnames';

import type { FC, MutableRefObject } from 'react';
import type { MathField } from 'react-mathquill';
import './index.scss';

interface IProps {
  latex: string;
  text: string;
  variableValues: Record<string, number | ''>;
  setLatex: (latex: string) => void;
  setText: (text: string) => void;
  setVariableValues: (variableValues: Record<string, number | ''>) => void;
  mathQullRef: MutableRefObject<MathField | null>;
  calculateExpression: (mathField?: MathField) => Promise<void>;
}

const InputBar: FC<IProps> = ({
  latex,
  text,
  variableValues,
  setLatex,
  setText,
  setVariableValues,
  mathQullRef,
  calculateExpression,
}) => {
  const [showPlaceholder, setShowPlaceholder] = useState(true);
  const [editabledFieldFocused, setEditabledFieldFocused] = useState(false);

  useEffect(() => {
    setShowPlaceholder(text === '' && !editabledFieldFocused);
  }, [text, editabledFieldFocused]);

  return (
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
            const variables = findVariables(mathField.text());

            let newVariableValues = {
              ...variables.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {}),
              ...variableValues,
            };

            newVariableValues = Object.fromEntries(
              Object.entries(newVariableValues).filter(([key]) => variables.includes(key)),
            );

            setLatex(mathField.latex());
            setText(mathField.text());
            setVariableValues(newVariableValues);
          }
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
          calculateExpression();
        }}
      >
        <p>Go</p>
      </div>
    </div>
  );
};

export default InputBar;
