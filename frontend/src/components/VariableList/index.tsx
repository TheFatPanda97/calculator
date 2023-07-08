import type { FC } from 'react';
import './index.scss';

interface IProps {
  variableValues: Record<string, number | ''>;
  setVariableValues: (variableValues: Record<string, number | ''>) => void;
}

const VariableList: FC<IProps> = ({ variableValues, setVariableValues }) => (
  <div className="variable-list">
    <p className="title">Variables:</p>
    {Object.keys(variableValues).length !== 0 && <hr />}
    {Object.entries(variableValues).map(([variable, val], index) => (
      <div key={index} className="variable-container">
        <span className="variable-display">{variable}</span>
        <input
          className="variable-input"
          type="text"
          value={val || ''}
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

export default VariableList;
