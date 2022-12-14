import fork from 'assets/fork.png';
import clone from 'assets/clone.png';
import pullrequest from 'assets/pullrequest.png';
import pullrequest2 from 'assets/pullrequest2.png';
import pullrequest3 from 'assets/pullrequest3.png';
import comment from 'assets/comment.png';

export default function ContributeGuide() {
  return (
    <div className="docs-content">
      <h1>MYINI에 기여해보세요.</h1>
      <span className="docs-detail">
        더 자세한 사항은
        <a
          href="https://github.com/wooobinkim/myini/blob/main/docs/ContributorGuide.md"
          target="_blank"
          rel="noreferrer"
        >
          &nbsp;컨트리뷰트 가이드
        </a>
        를 참고해주세요.
      </span>
      <div className="docs-content-item">
        <h3>시작하기 전</h3>
        <ul>
          <li>
            <span>
              ● MYINI는 올바른 오픈소스 문화를 토대로 컨트리부트를 진행하고
              있습니다.&nbsp;&nbsp;
              <a
                href="https://www.contributor-covenant.org/ko/version/1/4/code-of-conduct/"
                target="_blank"
                rel="noreferrer"
              >
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
              ● 코드 수정이 아니더라도 다양한 의견 / 아이디어 등을 통해 MYINI에
              기여해주세요.
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
              ● <b>Backend</b>&nbsp;&nbsp;Java : 11,&nbsp;&nbsp;SpringBoot :
              2.7.5,&nbsp;&nbsp;Gradle : 7.5.1
            </span>
          </li>
          <li>
            <span>
              ● <b>Frontend</b>
            </span>
            <div className="codes-wrapper">
              &#123;
              <div className="code-item">
                node version :&nbsp;
                <label className="module-name">v16.17.1</label>
              </div>
              <div className="code-item">
                react :&nbsp;
                <label className="module-name">v18.2.0</label>
              </div>
              <div className="code-item">
                react-dom :&nbsp;
                <label className="module-name">v18.2.0</label>
              </div>
              <div className="code-item">
                typescript :&nbsp;
                <label className="module-name">v4.8.4</label>
              </div>
              &#125;
            </div>
          </li>
        </ul>
      </div>
      <hr />
      <div className="docs-content-item">
        <h4>1. 우측 상단의 Fork를 눌러 Git Repository를 복제하세요.</h4>
        <img src={fork} alt="fork" />
      </div>
      <div className="docs-content-item">
        <h4>2. 복제된 Repository에서 Git Clone을 진행하세요.</h4>
        <div className="docs-content-item-code">
          git clone &quot;Git Clone URL&quot;
        </div>
        <img src={clone} alt="clone" />
      </div>
      <div className="docs-content-item">
        <h4>
          3. 새로운 브랜치를 생성하여 작업해주세요 브랜치 생성규칙은&nbsp;
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/ContributorConvention.md"
            target="_blank"
            rel="noreferrer"
          >
            컨트리뷰트 컨벤션
          </a>
          을 확인해주세요.
        </h4>
        <div className="docs-content-item-code">
          git branch &quot;새로운 브랜치 &quot; &quot;분기시작 브랜치 &quot;
        </div>
      </div>
      <div className="docs-content-item">
        <h4>
          4.
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/CodeConvention.md"
            target="_blank"
            rel="noreferrer"
          >
            개발컨벤션
          </a>
          을 토대로 코드를 수정한 후 Fork한 Repository로 Push해주세요.
          커밋메세지는&nbsp;
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/ContributorConvention.md"
            target="_blank"
            rel="noreferrer"
          >
            컨트리뷰트 컨벤션
          </a>
          을 확인해주세요.
        </h4>
        <div className="docs-content-item-code">
          # 코드수정 후 <br /> git add <br /> git commit <br /> git push
        </div>
      </div>
      <div className="docs-content-item">
        <h4>
          5. 원본 오픈소스 Repository로 이동하여 Pull Request를 보내주세요. Pull
          Request 메세지는&nbsp;
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/ContributorConvention.md"
            target="_blank"
            rel="noreferrer"
          >
            컨트리뷰트 컨벤션
          </a>
          을 확인해주세요.
        </h4>
        <img src={pullrequest} alt="pullrequest" />
        <img src={pullrequest2} alt="pullrequest2" />
        <img src={pullrequest3} alt="pullrequest3" />
      </div>
      <div className="docs-content-item">
        <h4>
          6. 개발진이 확인 후 작성하는 Comment를 확인해 주세요. 며칠 시간이
          소요될 수 있습니다.
        </h4>
        <img src={comment} alt="comment" />
      </div>
      {/* <span>여기로 연락주세용~~~~</span> */}
    </div>
  );
}
