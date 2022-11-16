import { useState, ReactNode } from 'react';

import AccordionItem from './AccordionItem';
import './style.scss';

export type AccordionData = {
  title: string;
  content: ReactNode;
  accordionItems: any;
  confirmData: any;
};

function Accordion1({ confirmData }: { confirmData: any }) {
  const [currentIdx, setCurrentIdx] = useState(-1);
  const btnOnClick = (idx: number) => {
    setCurrentIdx((currentValue) => (currentValue !== idx ? idx : -1));
  };
  const accordionItems = [
    {
      title: 'Controller',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'controller' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Entity',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'entity' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Repository',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'repository' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Service',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory.slice(0, 7) === 'service' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
    {
      title: 'Dto',
      content: (
        <div className="confirm-total">
          {' '}
          {confirmData.map((items: any, index: number) => (
            <div key={index}>
              {items.fileCategory === 'dto' ? (
                <>
                  <div className="confirm-title">{items.fileName}</div>
                  <div className="confirm-content">{items.contents}</div>
                </>
              ) : (
                <div />
              )}
            </div>
          ))}
        </div>
      ),
    },
  ];

  return (
    <ul className="accordion">
      {accordionItems.map((item, idx) => (
        <AccordionItem
          key={idx}
          data={item}
          isOpen={idx === currentIdx}
          btnOnClick={() => btnOnClick(idx)}
        />
      ))}
    </ul>
  );
}

export default Accordion1;
