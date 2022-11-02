import { useState } from 'react';

import ApiSpec from 'pages/ApiSpec';
import ERDPage from 'pages/ERDPage';
import Setting from 'pages/Setting';
import Requirement from 'pages/Requirement';
import MainHeader from 'components/MainHeader';

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
