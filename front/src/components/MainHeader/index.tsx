import './style.scss';

export default function MainHeader() {
  return (
    <div className="main-header">
      <div className="dropdown">
        <div className="profile-img" />
        <div className="dropdown-content">
          <p>홈</p>
          <p>로그아웃</p>
        </div>
      </div>
    </div>
  );
}
