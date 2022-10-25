import { ReactComponent as Logo } from '../../assets/logo.svg';
// import { ReactComponent as Footer } from '../../assets/footer_bg.svg';
import { ReactComponent as Login } from '../../assets/google_btn.svg';
import LogoBg from '../../assets/logo_bg.png';
import { ReactComponent as TitleBg } from '../../assets/title_bg.svg';
import './style.scss';

export default function LoginPage() {
  return (
    <div className="login-page">
      <div className="logo-container">
        <Logo className="logo" />
        <img src={LogoBg} alt="" className="logo-bg" />
      </div>
      <div className="title-container">
        <div className="login-container">
          <span className="MY">MY</span>
          <span className="INI">INI</span>
          <Login type="button" className="login-btn" />
        </div>
        <TitleBg className="title-bg" />
      </div>
      <div className="wave-container">
        <div className="wave -one" />
        <div className="wave -two" />
        <div className="wave -three" />
      </div>
    </div>
  );
}
