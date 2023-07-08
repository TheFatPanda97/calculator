import { useEffect } from 'react';

import type { FC } from 'react';
import './index.scss';

interface IProps {
  variables: string[];
  variableValues: Record<string, number | ''>;
  setVariableValues: (variableValues: Record<string, number | ''>) => void;
}

const VariableList: FC<IProps> = ({ variables, variableValues, setVariableValues }) => {
  useEffect(() => {
    let newVariableValues = {
      ...variables.reduce((acc, curr) => ({ ...acc, [curr]: 1 }), {}),
      ...variableValues,
    };

    newVariableValues = Object.fromEntries(
      Object.entries(newVariableValues).filter(([key]) => variables.includes(key)),
    );

    setVariableValues(newVariableValues);
  }, [variables]);

  return (
    <div className="variable-list">
      <p className="title">Variables:</p>
      {variables.length !== 0 && <hr />}
      {variables.map((variable, index) => (
        <div key={index} className="variable-container">
          <span className="variable-display">{variable}</span>
          <input
            className="variable-input"
            type="text"
            value={variableValues[variable] || ''}
            onChange={(e) =>
              setVariableValues({
                ...variableValues,
                [variable]: e.target.value === '' ? '' : Number(e.target.value),
              })
            }
          />
        </div>
      ))}
    </div>
  );
};

export default VariableList;
