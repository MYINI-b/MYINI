import { useState } from 'react';
import { useParams } from 'react-router-dom';

import MainHeader from 'components/MainHeader';
import ApiSpec from './ApiSpec';
import ERDPage from './ERDPage';
import Setting from './Setting';
import Requirement from './Requirement';
import Build from './Build';

export default function ProjectManage() {
  const [step, setStep] = useState(1);
  const { pid } = useParams();

  return (
    <div className="projectmanage-highest-container">
      <MainHeader needStepper step={step} setStep={setStep} />
      {step === 1 ? (
        <Setting pid={pid || ''} />
      ) : step === 2 ? (
        <Requirement pid={pid || ''} />
      ) : step === 3 ? (
        <ERDPage pid={pid || ''} />
      ) : step === 4 ? (
        <ApiSpec pid={pid || ''} />
      ) : (
        <Build pid={pid || ''} />
      )}
    </div>
  );
}
