import { ReactComponent as Login } from '../../assets/google_btn.svg';
import logo from '../../assets/logo.png';
import './style.scss';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="wave-container">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
      </div>

      <img src={logo} alt="logo" className="logo" />
      <div className="login-container">
        <div>
          <span className="MY">MY</span>
          <span className="INI">INI</span>
        </div>
        <a href="http://localhost:8080/oauth2/authorization/google">
          로그인하기
        </a>
        <Login className="login-btn" />
      </div>
    </div>
  );
}
