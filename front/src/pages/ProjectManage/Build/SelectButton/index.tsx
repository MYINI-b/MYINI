/* eslint-disable react/function-component-definition */
import React, { ReactElement, useState } from 'react';
import ButtonTitle from './buttonList';

type Props = {
  children: ReactElement[];
};
const Button: React.FC<Props> = ({ children }) => {
  const [selectedButton, setSelectedButton] = useState(0);
  console.log(selectedButton);
  return (
    <div className="button-container">
      <ul className="ul">
        {children.map((item, index: number) => (
          <ButtonTitle
            key={item.props.index}
            title={item.props.title}
            index={index}
            setSelectedButton={setSelectedButton}
            selectedButton={selectedButton}
          />
        ))}
      </ul>
      <div className="button-child">{children[selectedButton]}</div>
    </div>
  );
};

export default Button;
