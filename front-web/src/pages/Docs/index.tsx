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
              <h1>MYINI에 기여해보세요.</h1>
              <hr />
              <div className="docs-content-item">
                <h3>시작하기 전</h3>
                <span>
                  저희 MYINI는 올바른 오픈소스 문화를 토대로 컨트리부트를
                  진행하고 있습니다.
                </span>
                <span>
                  <a href="https://www.contributor-covenant.org/ko/version/1/4/code-of-conduct/">
                    컨트리부트 행동강령
                  </a>
                  을 읽고 진행해주세요!
                </span>
              </div>
              <hr />
              <div className="docs-content-item">
                <span>
                  저희 MYINI는 아래 과정을 통해 컨트리뷰션을 진행하고 있습니다.
                </span>
                <br />
                <span>
                  코드 수정이 아니더라도 다양한 의견 / 아이디어 등을 통해
                  MYINI에 기여해주세요.
                </span>
              </div>
              {/* <span>여기로 연락주세용~~~~</span> */}
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
