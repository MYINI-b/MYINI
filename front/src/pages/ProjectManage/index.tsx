import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useSyncedStore } from '@syncedstore/react';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { RoomProvider } from '@y-presence/react';
import * as Y from 'yjs';
import { RootState } from 'modules/Reducers';
import { globalStore, ProjectInfo, globalStore2 } from 'store/yjsStore';

import { UserPresence } from 'types/main';
import DefaultProfile from 'assets/default-profile.png';
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
  const [newPid, setNewPid] = useState('');
  const { sessions } = useSelector((state: RootState) => state.project);
  const newStore = sessions[`pjt${pid}`]
    ? sessions[`pjt${pid}`]
    : syncedStore({
        pjt: {} as ProjectInfo,
      });
  const [store, setStore] = useState<any>(useSyncedStore(newStore));
  const [Awareness, setAwareness] = useState<any>(null);
  const { memberNickname, memberProfileImg, memberId } = useSelector(
    (state: RootState) => state.member,
  );

  useEffect(() => {
    const setReduxPid = async () => {
      let rtcProvider;
      if (pid === 'new') {
        const { data }: any = await postApi(`/projects`);
        setNewPid(data.projectId);
        // dispatch(setPid(data.projectId));
        rtcProvider = new WebrtcProvider(
          `pjt${data.projectId}`,
          getYjsValue(newStore) as any,
        );
        const { awareness } = rtcProvider;
        setAwareness(awareness);
      } else {
        dispatch(setPid(pid || ''));
        rtcProvider = new WebrtcProvider(
          `pjt${pid}`,
          getYjsValue(newStore) as any,
        );

        const { awareness } = rtcProvider;
        setAwareness(awareness);
      }

      if (store.pjt.editors) {
        const editors = [...store.pjt.editors].map(
          (edt: any) => edt.id !== memberId,
        );
        store.pjt.editors = editors;
      }

      window.addEventListener('beforeunload', () => {
        const copyEditors = store.pjt.editors.map(
          (edt: any) => edt.id !== memberId,
        );
        store.pjt.editors = copyEditors;
        alert('end');
      });
    };

    setReduxPid();
  }, [pid, store]);

  return (
    <div className="projectmanage-highest-container">
      <MainHeader needStepper step={step} setStep={setStep} />
      {Awareness && (
        <RoomProvider<UserPresence>
          awareness={Awareness}
          initialPresence={{
            name: memberNickname,
            color: `#${Math.round(Math.random() * 0xffffff).toString(16)}`,
            step: 1,
            img: memberProfileImg || DefaultProfile,
          }}
        >
          {step === 1 ? (
            <Setting store={store} pid={pid === 'new' ? newPid : pid || ''} />
          ) : step === 2 ? (
            <Requirement
              store={store}
              pid={pid === 'new' ? newPid : pid || ''}
            />
          ) : step === 3 ? (
            <ERDPage store={store} pid={pid === 'new' ? newPid : pid || ''} />
          ) : step === 4 ? (
            <ApiSpec store={store} pid={pid === 'new' ? newPid : pid || ''} />
          ) : (
            <Build store={store} pid={pid === 'new' ? newPid : pid || ''} />
          )}
        </RoomProvider>
      )}
    </div>
  );
}
