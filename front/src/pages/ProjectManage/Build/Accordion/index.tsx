/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';

import './style.scss';

const data = {
  accordion: [
    {
      id: 0,
      title: 'Controller',
      body: '무슨내용?',
    },
    {
      id: 1,
      title: 'Repository',
      body: '내용2',
    },
    {
      id: 2,
      title: 'Entity',
      body: '내용3',
    },
    {
      id: 3,
      title: 'etc..',
      body: '내용4',
    },
  ],
};

interface DataProps {
  accordion: {
    id: number;
    title: string;
    body: string;
  }[];
}

const Accordion: React.FC = () => {
  const { accordion } = data as DataProps;
  const [titleNum, setTitleNum] = useState<number>(-1);

  const showBody = (index: number): void => {
    if (titleNum === index) {
      setTitleNum(-1);
      return;
    }
    setTitleNum(index);
  };

  return (
    <div>
      {accordion.map((item, index) => (
        <div
          role="presentation"
          key={item.id}
          className="title-card"
          onClick={() => showBody(index)}
        >
          <div className="title-heading">
            <div className="title-item">{item.title}</div>
            {titleNum === index ? (
              <FontAwesomeIcon icon={faChevronUp} />
            ) : (
              <FontAwesomeIcon icon={faChevronDown} />
            )}
          </div>
          <p className={`title-body ${titleNum === index && 'active'}`}>
            {item.body}
          </p>
        </div>
      ))}
    </div>
  );
};
export default Accordion;
