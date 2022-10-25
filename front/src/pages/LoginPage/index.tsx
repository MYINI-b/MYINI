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
        <Login className="login-btn" />
      </div>
    </div>
  );
}
