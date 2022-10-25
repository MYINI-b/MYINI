import MainHeader from 'components/MainHeader';
import CardLogo from '../../assets/card-logo.png';
import './style.scss';

export default function MainPage() {
  const dummyText =
    '이 프로젝트는 1953년 영국에서부터 전해져와 이 글을 읽을 시 3명에게 복사해서 보내지 않을 경우 수상하지 못합니다.';
  return (
    <div>
      <div className="wave-container">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
      </div>
      <MainHeader />
      <div className="main-page">
        <span className="user-name">한윤석</span>
        <span className="user-ini">`s INI</span>
        <div className="project-info">
          <div className="project-div">
            <h2 className="project-info-title">내 프로젝트 수</h2>
            <h2>5 개</h2>
          </div>
          <div className="project-div1">
            <h2 className="project-info-title">함께 했던 팀원</h2>
            <div className="members">
              <div className="member" />
            </div>
          </div>
        </div>
        <div className="card-container">
          <div className="card-scroll">
            <div className="project-start">
              <img src={CardLogo} alt="" className="card-logo" />
              <span>새 프로젝트</span>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">프로젝트명</div>
              </div>
              <div className="card-body">
                <div className="card-body-header">
                  <h1>프로젝트명</h1>
                </div>
                <p className="card-body-context">
                  {dummyText}
                  <div className="members">
                    <div className="member" />
                    <div className="member" />
                    <div className="member" />
                  </div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">프로젝트명</div>
              </div>
              <div className="card-body">
                <div className="card-body-header">
                  <h1>프로젝트명</h1>
                </div>
                <p className="card-body-context">
                  이 프로젝트는 1953년 영국에서부터 전해져와 이 글을 읽을 시
                  3명에게 복사해서 보내지 않을 경우 수상하지 못합니다.
                  <div className="members">
                    <div className="member" />
                    <div className="member" />
                    <div className="member" />
                  </div>
                </p>
              </div>
            </div>
            <div className="card">
              <div className="card-header">
                <div className="card-header-title">프로젝트명</div>
              </div>
              <div className="card-body">
                <div className="card-body-header">
                  <h1>프로젝트명</h1>
                </div>
                <p className="card-body-context">
                  이 프로젝트는 1953년 영국에서부터 전해져와 이 글을 읽을 시
                  3명에게 복사해서 보내지 않을 경우 수상하지 못합니다.
                  <div className="members">
                    <div className="member" />
                    <div className="member" />
                    <div className="member" />
                  </div>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
