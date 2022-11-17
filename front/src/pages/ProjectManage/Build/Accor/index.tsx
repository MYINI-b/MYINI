import { useState, ReactNode } from 'react';
import Editor from '@monaco-editor/react';

import AccordionItem from './AccordionItem';
import './style.scss';

export type AccordionData = {
  title: string;
  content: ReactNode;
  accordionItems: any;
  confirmData: any;
};

function Accordion1({ confirmData }: { confirmData: any }) {
  const controllerConfirmData = confirmData.filter(
    (cdt: any) => cdt.fileCategory === 'controller',
  );
  const entityConfirmData = confirmData.filter(
    (cdt: any) => cdt.fileCategory === 'entity',
  );
  const repositoryConfirmData = confirmData.filter(
    (cdt: any) => cdt.fileCategory === 'repository',
  );
  const serviceConfirmData = confirmData.filter(
    (cdt: any) => cdt.fileCategory === 'service',
  );
  const dtoConfirmData = confirmData.filter(
    (cdt: any) => cdt.fileCategory === 'dto',
  );
  const accordionItems = [
    {
      title: 'Controller',
      content: (
        <>
          {controllerConfirmData.map((items: any, index: number) => (
            <div className="confirm-card" key={index}>
              <div className="confirm-title">{items.fileName}</div>
              <Editor
                width="100%"
                height="400px"
                defaultLanguage="java"
                defaultValue={items.contents.replace(/(?:\r\n|\r|\n)/g, '\n\n')}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Entity',
      content: (
        <>
          {entityConfirmData.map((items: any, index: number) => (
            <div className="confirm-card" key={index}>
              <div className="confirm-title" key={`entity${index}`}>
                {items.fileName}
              </div>
              <Editor
                width="100%"
                height="400px"
                defaultLanguage="java"
                defaultValue={items.contents.replace(/(?:\r\n|\r|\n)/g, '\n\n')}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Repository',
      content: (
        <>
          {repositoryConfirmData.map((items: any, index: number) => (
            <div className="confirm-card" key={index}>
              <div className="confirm-title" key={`confirm${index}`}>
                {items.fileName}
              </div>
              <Editor
                width="100%"
                height="400px"
                defaultLanguage="java"
                defaultValue={items.contents.replace(/(?:\r\n|\r|\n)/g, '\n\n')}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Service',
      content: (
        <>
          {serviceConfirmData.map((items: any, index: number) => (
            <div className="confirm-card" key={index}>
              <div className="confirm-title" key={`service${index}`}>
                {items.fileName}
              </div>
              <Editor
                width="100%"
                height="400px"
                defaultLanguage="java"
                defaultValue={items.contents.replace(/(?:\r\n|\r|\n)/g, '\n\n')}
              />
            </div>
          ))}
        </>
      ),
    },
    {
      title: 'Dto',
      content: (
        <>
          {dtoConfirmData.map((items: any, index: number) => (
            <div className="confirm-card" key={index}>
              <div className="confirm-title" key={`dto${index}`}>
                {items.fileName}
              </div>
              <Editor
                width="100%"
                height="400px"
                defaultLanguage="java"
                defaultValue={items.contents.replace(/(?:\r\n|\r|\n)/g, '\n\n')}
              />
            </div>
          ))}
        </>
      ),
    },
  ];

  return (
    <ul className="accordion">
      {accordionItems.map((item: any, idx: number) => (
        <AccordionItem key={idx} data={item} />
      ))}
    </ul>
  );
}

export default Accordion1;
