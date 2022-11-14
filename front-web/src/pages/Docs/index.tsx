import React, { useState } from 'react';
import Header from 'component/Header';
import fork from 'assets/fork.png';
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
              <span>
                더 자세한 내용은
                <a href="https://lab.ssafy.com/s07-final/S07P31B203">
                  &nbsp;이곳
                </a>
                에서 확인해주세요.
              </span>
              <hr />
              <div className="docs-content-item">
                <h3>시작하기 전</h3>
                <ul>
                  <li>
                    <span>
                      ● MYINI는 올바른 오픈소스 문화를 토대로 컨트리부트를
                      진행하고 있습니다.&nbsp;&nbsp;
                      <a href="https://www.contributor-covenant.org/ko/version/1/4/code-of-conduct/">
                        컨트리부트 행동강령
                      </a>
                      을 읽고 진행해주세요!
                    </span>
                  </li>
                  <li>
                    <span>
                      ● MYINI는 아래 과정을 통해 컨트리뷰션을 진행하고 있습니다.
                    </span>
                  </li>
                  <li>
                    <span>
                      ● 코드 수정이 아니더라도 다양한 의견 / 아이디어 등을 통해
                      MYINI에 기여해주세요.
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="docs-content-item">
                <h4>0. MYINI와 동일하게 개발 버전을 맞춰주세요.</h4>
                <ul>
                  <li>
                    <span>
                      ● <b>Backend</b>&nbsp;&nbsp;Java :
                      11,&nbsp;&nbsp;SpringBoot : 2.7.5,&nbsp;&nbsp;Gradle :
                      7.5.1
                    </span>
                  </li>
                  <li>
                    <span>
                      ● <b>Frontend</b>&nbsp;&nbsp;Java :
                      11,&nbsp;&nbsp;SpringBoot : 2.7.5,&nbsp;&nbsp;Gradle :
                      7.5.1
                    </span>
                  </li>
                </ul>
              </div>
              <hr />
              <div className="docs-content-item">
                <h4>1. 우측 상단의 Fork를 눌러 Git Repository를 복제하세요.</h4>
                <img src={fork} alt="fork" />
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
