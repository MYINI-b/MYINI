/* eslint-disable react/function-component-definition */
import React, { ReactElement, useState } from 'react';
import TabTitle from './TabTitle';

type Props = {
  children: ReactElement[];
};

const Tabs: React.FC<Props> = ({ children }) => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className="tab-container">
      <ul className="ul">
        {children.map((item, index: number) => (
          <TabTitle
            key={item.props.index}
            title={item.props.title}
            index={index}
            setSelectedTab={setSelectedTab}
            selectedTab={selectedTab}
          />
        ))}
      </ul>
      <div className="tab-child">{children[selectedTab]}</div>
    </div>
  );
};

export default Tabs;
