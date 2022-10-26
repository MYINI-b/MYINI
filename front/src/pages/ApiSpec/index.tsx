import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle } from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import Stepper from 'pages/Requirement/Stepper';

export default function ApiSpec() {
  const [step, setStep] = useState(1);
  const canEdit = false;

  return (
    <div className="apispec-container">
      <Stepper step={step} setStep={setStep} />
      <h1 className="apispec-title">API 명세서</h1>
      <section className="apispec-info-section">
        <h2 className="apispec-project-title">project name</h2>
        <span className="apispec-status-span">
          <FontAwesomeIcon
            icon={faCircle}
            className={`apispec-status-icon ${canEdit ? 'on' : 'off'}`}
          />
          &nbsp;{canEdit ? '편집가능' : '편집불가'}
        </span>
      </section>
    </div>
  );
}
