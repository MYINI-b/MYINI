import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useSyncedStore } from '@syncedstore/react';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';

import { globalStore, ProjectInfo } from 'store/yjsStore';
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
  const [store, setStore] = useState<any>(useSyncedStore(globalStore));

  useEffect(() => {
    const setReduxPid = async () => {
      if (pid === 'new') {
        const { data }: any = await postApi(`/projects`);
        dispatch(data.projectId);
        const newStore = syncedStore({
          pjt: {} as ProjectInfo,
        });
        new WebrtcProvider(
          `project${data.projectId}`,
          getYjsValue(newStore) as any,
        );
        setStore(newStore);
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
