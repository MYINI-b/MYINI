export default function MyiniGuide() {
  return (
    <div className="docs-content">
      <h1>MYINI 가이드를 확인해보세요.</h1>
      <span className="docs-detail">
        더 자세한 사항은
        <a
          href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md"
          target="_blank"
          rel="noreferrer"
        >
          MYINI 가이드
        </a>
        를 참고해주세요.
      </span>
      <div className="docs-content-item">
        <h3>MYINI는..</h3>
        <span> myINI에는 프로젝트 기획에 필요한 다양한 기능들이 있습니다.</span>
        <span>
          <b>동시편집 기능</b>을 제공하여 더 확실한 협업서비스를 제공합니다.
        </span>
      </div>
      <div className="docs-content-item">
        <h3>MYINI는 다음과 같은 기능들을 제공합니다.</h3>
        <ul>
          <li>
            <h4>요구사항 명세서 With Jira</h4>
            <span>
              작성한 요구사항 명세서를 바탕으로 Jira 이슈가 자동으로 등록됩니다.
            </span>
          </li>
          <li>
            <h4>E-R 다이어그램</h4>
            <span>
              서비스 요구사항 기획에 따라 E-R Diagram(개체-관계 다이어그램)을
              생성할 수 있습니다. 만들어진 ERD정보를 바탕으로 해당 프로젝트의
              Domain(Entity, Repository)이 생성됩니다.
            </span>
          </li>
          <li>
            <h4>API 명세서</h4>
            <span>
              서API 문서에 따라 프로젝트의 기본적인 MVC 패턴 코드를 이니셜라이징
              해드립니다.
            </span>
          </li>
          <li>
            <h4>빌드</h4>
            <span>
              사용자가 원하는 버전에 맞춰 프로젝트의 환경을 설정하고, 산출물을
              바탕으로 코드를 이니셜라이징 할 수 있습니다.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
