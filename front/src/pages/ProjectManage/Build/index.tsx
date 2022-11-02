import './style.scss';

import InitSetting from './InitSetting';
import ConfirmCode from './ConfirmCode';

export default function Build() {
  return (
    <div className="build-container">
      <InitSetting />
      <ConfirmCode />
    </div>
  );
}
