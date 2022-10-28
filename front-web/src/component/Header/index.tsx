import './style.scss';
import Logo from '../../assets/icon.png';

export default function Header() {
  return (
    <div className="header">
      <div className="head-title">
        <img src={Logo} alt="" className="logo" />
        <div className="title-container">
          <span className="MY">MY</span>
          <span className="INI">INI</span>
        </div>
      </div>
      <div className="navbar">
        <button type="button" className="nav-button">
          Product
        </button>
        <button type="button" className="nav-button">
          Docs
        </button>
        <button type="button" className="nav-button">
          Repository
        </button>
      </div>
    </div>
  );
}
