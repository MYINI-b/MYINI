/* eslint-disable react/function-component-definition */
import React, { ReactElement, useState } from 'react';
import ButtonTitle from './buttonList';

type Props = {
  children: ReactElement[];
};

const Button: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="button-container">
      <ul className="ul">
        {children.map((item, index: number) => (
          <ButtonTitle
            key={item.props.index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}
      </ul>
      <div className="button-child">{children[selectedTab]}</div>
    </div>
  );
};

export default Button;
