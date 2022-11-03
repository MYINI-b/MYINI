import './style.scss';

import InitSetting from './InitSetting';
import ConfirmCode from './ConfirmCode';

export default function Build() {
  return (
    <div className="build-container">
      <h1 className="apispec-title">API 명세서</h1>
      <h2 className="apispec-project-title">project name</h2>
      <div className="build-main">
        <InitSetting />
        <ConfirmCode />
      </div>
    </div>
  );
}
