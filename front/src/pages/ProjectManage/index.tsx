import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import MainHeader from 'components/MainHeader';
import { setPid } from 'modules/Project';
import { postApi } from 'api';
import ApiSpec from './ApiSpec';
import ERDPage from './ERDPage';
import Setting from './Setting';
import Requirement from './Requirement';
import Build from './Build';

export default function ProjectManage() {
  const [step, setStep] = useState(1);
  const { pid } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const setReduxPid = async () => {
      if (pid === 'new') {
        const { data }: any = await postApi(`/projects`);
        dispatch(data.projectId);
      } else {
        dispatch(setPid(pid || ''));
      }
    };

    setReduxPid();
  }, []);

  return (
    <div className="projectmanage-highest-container">
      <MainHeader needStepper step={step} setStep={setStep} />
      {step === 1 ? (
        <Setting />
      ) : step === 2 ? (
        <Requirement />
      ) : step === 3 ? (
        <ERDPage />
      ) : step === 4 ? (
        <ApiSpec />
      ) : (
        <Build />
      )}
    </div>
  );
}
