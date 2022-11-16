import React, { useState } from 'react';
import Header from 'component/Header';

import './style.scss';
import MyiniGuide from './MyiniGuide';
import ContributeGuide from './ContributeGuide';
import More from './More';

export default function Docs() {
  const [docsStep, setDocsStep] = useState(0);

  return (
    <div className="docs-container">
      <Header />
      <div className="docs-wrapper">
        <div className="docs-title-container">
          <h2
            className={`docs-title ${docsStep === 0 && 'select'}`}
            onClick={() => setDocsStep(0)}
          >
            MYINI 가이드
          </h2>
          <h2
            className={`docs-title ${docsStep === 1 && 'select'}`}
            onClick={() => setDocsStep(1)}
          >
            컨트리뷰트 가이드
          </h2>
          <h2
            className={`docs-title ${docsStep === 2 && 'select'}`}
            onClick={() => setDocsStep(2)}
          >
            더 알아보기
          </h2>
        </div>
        <div className="docs-content-container">
          {docsStep === 0 ? (
            <MyiniGuide />
          ) : docsStep === 1 ? (
            <ContributeGuide />
          ) : (
            <More />
          )}
        </div>
      </div>
    </div>
  );
}
