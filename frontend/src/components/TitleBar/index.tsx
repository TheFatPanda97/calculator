import type { FC } from 'react';
import './index.scss';

const TitleBar: FC = () => {
  return (
    <div className="title-bar">
      <img src="/logo.png" alt="" />
      <span>Pretty Calculator</span>
    </div>
  );
};

export default TitleBar;
