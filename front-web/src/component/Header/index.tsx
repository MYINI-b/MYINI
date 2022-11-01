import './style.scss';
import { Link } from 'react-router-dom';
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
        <Link to="/">
          <button type="button" className="nav-button">
            Product
          </button>
        </Link>
        <Link to="/docs">
          <button type="button" className="nav-button">
            Docs
          </button>
        </Link>
        <button type="button" className="nav-button">
          Repository
        </button>
      </div>
    </div>
  );
}
