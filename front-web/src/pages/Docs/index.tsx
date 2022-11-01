import React, { useState } from 'react';
import Header from 'component/Header';
import './style.scss';

export default function Docs() {
  const [docsStep, setDocsStep] = useState(0);

  return (
    <div className="">
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
            <div className="docs-content">
              <h1>MYINI는 무엇을 제공해주나요?</h1>
              <hr />
              <div>이러이러한거 제공해줍니다.</div>
            </div>
          ) : docsStep === 1 ? (
            <div className="docs-content">
              <h1>우리는 컨트리뷰트를 환영합니다.</h1>
              <hr />
              <span>여기로 연락주세용~~~~</span>
            </div>
          ) : (
            <div className="docs-content">
              <h1>혹시 사용 시 문제가 생기셨나요...?</h1>
              <span>ㅁㄴ?ㅇ?ㅁㄴ?</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
