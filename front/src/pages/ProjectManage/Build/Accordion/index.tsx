/* eslint-disable react/function-component-definition */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { AccordionType } from '..';

import './style.scss';

type AccodionProps = {
  accordion: AccordionType; // 부모컴포넌트에서 import 해온 타입을 재사용 해 줍시다.
};

export default function Accordion({
  accordion,
}: AccodionProps): React.ReactElement {
  const { id, title, body, idx } = accordion;
  const [titleNum, setTitleNum] = useState<number>(-1);

  const showBody = (idx: number): void => {
    if (titleNum === idx) {
      setTitleNum(-1);
      return;
    }
    console.log(titleNum, 1);
    setTitleNum(idx);
  };

  console.log(titleNum, 2);
  console.log(idx);
  return (
    <div
      role="presentation"
      key={id}
      className="title-card"
      onClick={() => showBody(idx)}
    >
      <div className="title-heading">
        <div className="title-item">{title}</div>
        {titleNum === idx ? (
          <FontAwesomeIcon icon={faChevronUp} />
        ) : (
          <FontAwesomeIcon icon={faChevronDown} />
        )}
      </div>
      <p className={`title-body ${titleNum === idx && 'active'}`}>{body}</p>
    </div>
  );
}
