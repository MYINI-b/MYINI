import './style.scss';

import InitSetting from './InitSetting';
import ConfirmCode from './ConfirmCode';

export default function ProjectBuild() {
  return (
    <div className="build-container">
      <InitSetting />
      <ConfirmCode />
    </div>
  );
}
