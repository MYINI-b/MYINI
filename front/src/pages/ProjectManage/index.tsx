import { useState } from 'react';

import MainHeader from 'components/MainHeader';
import ApiSpec from './ApiSpec';
import ERDPage from './ERDPage';
import Setting from './Setting';
import Requirement from './Requirement';

export default function ProjectManage() {
  const [step, setStep] = useState(1);
  return (
    <div className="projectmanage-highest-container">
      <MainHeader needStepper step={step} setStep={setStep} />
      {step === 1 ? (
        <Setting />
      ) : step === 2 ? (
        <Requirement />
      ) : step === 3 ? (
        <ERDPage />
      ) : (
        <ApiSpec />
      )}
    </div>
  );
}
