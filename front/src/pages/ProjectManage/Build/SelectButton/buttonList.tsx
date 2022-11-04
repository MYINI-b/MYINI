/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import './style.scss';

import React, { useCallback } from 'react';

type Props = {
  title: string;
  index: number;
  setSelectedButton: (index: number) => void;
  selectedButton: number;
};

const ButtonTitle: React.FC<Props> = ({
  title,
  setSelectedButton,
  index,
  selectedButton,
}) => {
  const onClick = useCallback(() => {
    setSelectedButton(index);
  }, [setSelectedButton, index]);
  return (
    <div className="button-list">
      <li
        className={`li ${selectedButton === index ? 'active' : ''}`}
        onClick={onClick}
      >
        <button className="title-name">{title}</button>
      </li>
    </div>
  );
};

export default ButtonTitle;
