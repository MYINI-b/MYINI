import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useRef, useState, RefObject, ReactNode } from 'react';
import './style.scss';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export function getRefValue<C>(ref: RefObject<C>) {
  return ref.current as C;
}

export type AccordionData = {
  title: string;
  content: ReactNode;
};

function AccordionItem({ data }: { data: any }) {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // useEffect(() => {
  //   if (isOpen) {
  //     const contentEl = getRefValue(contentRef);

  //     setHeight(contentEl.scrollHeight);
  //   } else {
  //     setHeight(0);
  //   }
  // }, [isOpen]);

  const btnOnClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <li className={`accordion-item ${isOpen && 'open'}`}>
      <h2 className="accordion-item-title" onClick={btnOnClick}>
        <label>{data.title}</label>
        <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} />
      </h2>
      {isOpen && <div className="accordion-item-container">{data.content}</div>}
    </li>
  );
}

export default AccordionItem;
