import Header from '../../component/Header';
import './style.scss';
import Background from '../../assets/main-bg.png';
import BackgroundOne from '../../assets/main-bg1.png';
import BackgroundTwo from '../../assets/main-bg2.png';
import BackgroundThree from '../../assets/main-bg3.png';
import ApiIcon from '../../assets/browser.gif';
import SpecIcon from '../../assets/checklist.gif';
import ErdIcon from '../../assets/diagram.gif';
import Icon from '../../assets/icon0.png';

export default function Onboarding() {
  return (
    <div>
      <Header />
      <div className="body-container">
        <section className="first-section">
          <img src={Background} alt="" className="bg-img" />
          <div className="head-title">
            <h1 className="head-line">프로젝트 시작의 모든것</h1>
            <h1 className="head-line"> MYINI로 쉽고 간편하게</h1>
          </div>
          <button type="button" className="download-btn">
            다운로드
          </button>
          <div className="wave-container">
            <div className="wave -one" />
            <div className="wave -two" />
            <div className="wave -three" />
          </div>
        </section>

        <section className="second-section">
          <div className="second-bg" />
          <div className="second-head-container">
            <h1 className="second-head-title">PROJECT MANAGEMENT</h1>
            <div className="second-content-container">
              <div className="second-content-box">
                <h1 className="second-content">프로젝트 시작,</h1>
                <h1 className="second-content">설계부터 빌드까지</h1>
                <h1 className="second-content">똑똑하게</h1>
              </div>
              <div>
                <h1 className="second-content">MYINI에서</h1>
                <h1 className="second-content">
                  새로운 프로젝트를 시작해보세요.
                </h1>
              </div>
            </div>
          </div>
          <img src={BackgroundOne} alt="" className="bg-img1" />
        </section>

        <section className="third-section">
          <img src={BackgroundTwo} alt="" className="bg-img2" />
          <div className="third-bg" />
          <div className="third-head-container">
            <h1 className="third-head-title">PROJECT PLANNING</h1>
            <div className="third-content-box">
              <h1 className="third-content">복잡한 기획, 설계</h1>
              <h1 className="third-content">한번에 관리하세요</h1>
              <div className="third-icon-container">
                <div className="third-content-icon">
                  <img src={SpecIcon} alt="" className="icons" />
                  SPEC
                </div>
                <div className="third-content-icon">
                  <img src={ErdIcon} alt="" className="icons" />
                  ERD
                </div>
                <div className="third-content-icon">
                  <img src={ApiIcon} alt="" className="icons" />
                  API
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="fourth-section">
          <div className="bg-container">
            <img src={BackgroundThree} alt="" className="bg-img3" />
            <img src={Icon} alt="" className="icon-0" />
          </div>
          <div className="fourth-head-container">
            <h1 className="fourth-head-title">PROJECT BUILD</h1>
            <div className="fourth-content-container">
              <h1 className="fourth-content">어려운 초기빌드</h1>
              <h1 className="fourth-content">한번에 해결해드려요</h1>
            </div>
          </div>
          <div className="wave-container">
            <div className="wave -one" />
            <div className="wave -two" />
            <div className="wave -three" />
          </div>
        </section>
      </div>
      <div className="footer-container">asdasdasdsa</div>
    </div>
  );
}
