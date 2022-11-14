import Login from 'assets/login_btn.png';
import logo from 'assets/icon.png';
import './style.scss';

// 3rd party
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

export default function LoginPage() {
  const moveToMain = () => {
    window.location.href =
      'https://k7b203.p.ssafy.io/oauth2/authorization/google';
  };

  return (
    <div className="login-page">
      <div className="wave-container">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
      </div>

      <img src={logo} alt="logo" className="login-logo" />
      <div className="login-container">
        <div className="login-title-container">
          <span className="MY">MY</span>
          <span className="INI">INI</span>
        </div>
        <button type="button" className="login-google-btn" onClick={moveToMain}>
          <span>
            <FontAwesomeIcon icon={faGoogle} className="google-logo" />
            <span className="start-with-google">Google로 시작하기</span>
          </span>
        </button>
      </div>
    </div>
  );
}
