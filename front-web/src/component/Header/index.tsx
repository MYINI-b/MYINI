import './style.scss';
import { Link } from 'react-router-dom';
import Logo from '../../assets/icon.png';

export default function Header() {
  return (
    <div className="header">
      <div className="head-title">
        <img src={Logo} alt="" className="logo" />
        <div className="title-container">
          <Link to="/">
            <button type="button" className="MY">
              MY
            </button>
            <button type="button" className="INI">
              INI
            </button>
          </Link>
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
        <a
          href="https://github.com/wooobinkim/myini/"
          target="_blank"
          rel="noreferrer"
        >
          <button type="button" className="nav-button">
            Repository
          </button>
        </a>
        <Link to="/license">
          <button type="button" className="nav-button">
            License
          </button>
        </Link>
      </div>
    </div>
  );
}
