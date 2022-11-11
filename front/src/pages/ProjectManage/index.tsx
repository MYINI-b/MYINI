import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSyncedStore } from '@syncedstore/react';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import * as Y from 'yjs';
import { RootState } from 'modules/Reducers';
import { globalStore, ProjectInfo, globalStore2 } from 'store/yjsStore';
import MainHeader from 'components/MainHeader';
import { setPid, addSession, setProvider, setSessions } from 'modules/project';

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

  const newStore = pid === '3' ? globalStore : globalStore2;
  const [store, setStore] = useState<any>(useSyncedStore(newStore));
  new WebrtcProvider(`project${pid}`, getYjsValue(newStore) as any);

  useEffect(() => {
    const setReduxPid = async () => {
      if (pid === 'new') {
        const { data }: any = await postApi(`/projects`);
        dispatch(setPid(data.projectId));
      } else {
        dispatch(setPid(pid || ''));
      }
    };

    setReduxPid();
  }, [pid]);

  return (
    <div className="projectmanage-highest-container">
      <MainHeader needStepper step={step} setStep={setStep} />
      {step === 1 ? (
        <Setting store={store} />
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
