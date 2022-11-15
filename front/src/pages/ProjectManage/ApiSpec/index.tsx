import { useState, useCallback, useEffect } from 'react';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useSelector } from 'react-redux';
import {
  faCircle,
  faPenToSquare,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import DefaultProfile from 'assets/default-profile.png';
import { getApi } from 'api';
import { DTO } from 'types/ApiSpec';
import { Cursor } from 'components/Cursor';
import TimerModal from 'components/TimerModal';
import { RootState } from 'modules/Reducers';
import { stderr } from 'process';
import APIList from './APIList';
import ControllerAddModal from './ControllerAddModal';
import DatatypeModal from './DatatypeModal';

interface Props {
  pid: string;
  store: any;
}

export default function ApiSpec({ store, pid }: Props) {
  const others = useOthers<UserPresence>();
  const updatePresence = useUpdatePresence<UserPresence>();
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);
  const [controllerIdx, setControllerIdx] = useState(-1); // 현재 선택된 컨트롤러 인덱스
  const [clickControllerIdx, setClickControllerIdx] = useState(0); // 현재 선택된 컨트롤러 인덱스
  const [isControllerAddModalOpen, setIsControllerAddModalOpen] =
    useState(false);
  const [isDatatypeModalOpen, setIsDatatypeModalOpen] = useState(false);
  const { memberId, memberProfileImg, memberNickname } = useSelector(
    (state: RootState) => state.member,
  );

  const handlePointMove = useCallback(
    (e: React.PointerEvent) => {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
        step: 4,
      });
    },
    [updatePresence],
  );

  const onControllerBlockClick = useCallback((idx: number) => {
    setControllerIdx(idx);
  }, []);

  const onHandleControllerClick = useCallback(
    (idx: number, cid: number) => {
      const find = store.pjt.editors.find(
        (edt: any) => edt.space === 'CONTROLLER' && edt.sid === cid,
      );

      console.log(find);
      if (find) {
        setIsAlertModalOpen(true);
        return;
      }

      setClickControllerIdx(idx);
      setIsControllerAddModalOpen(true);
      store.pjt.editors.push({
        id: memberId,
        space: 'CONTROLLER',
        sid: cid,
        img: memberProfileImg,
        name: memberNickname,
      });
    },
    [store],
  );

  const onDatatypeClick = useCallback(() => {
    const find = store.pjt.editors.find((edt: any) => edt.space === 'DATATYPE');
    if (find) {
      setIsAlertModalOpen(true);
      return;
    }
    setIsDatatypeModalOpen(true);
    store.pjt.editors.push({
      id: memberId,
      space: 'DATATYPE',
      sid: 0,
      img: memberProfileImg,
      name: memberNickname,
    });
  }, [store]);

  useEffect(() => {
    const getControllers = async () => {
      store.pjt.controllers = [];
      await getApi(`/apidocs/${pid}/controllers`).then(({ data }: any) => {
        data.forEach(async (apiController: any) => {
          await getApi(
            `/apidocs/controllers/${apiController.apiControllerId}`,
          ).then(({ data }: any) => {
            console.log(data);
            if (store.pjt.controllers !== undefined)
              store.pjt.controllers.push({
                id: data.apiControllerId,
                name: data.apiControllerName,
                desc: data.apiControllerDescription,
                baseurl: data.apiControllerBaseUrl,
                responses: data.apiResponses.map((api: any) => {
                  return {
                    id: api.apiId,
                    apiName: api.apiName,
                    methodName: api.apiMethodName,
                    url: api.apiUrl,
                    method: api.apiMethod,
                    code: api.apiCode === 'OK' ? 200 : 201,
                  };
                }),
              });
          });
        });
        if (data.length > 0) setControllerIdx(0);
      });
    };

    getControllers();
  }, []);

  return (
    <div className="apispec-container" onPointerMove={handlePointMove}>
      <h1 className="apispec-title">
        API 명세서 &nbsp;
        <div className="other-list-container">
          {others
            .filter((user) => user.presence.step === 4)
            .map((user: any, i: number) => {
              return (
                <div className="other-color-container" key={i}>
                  <img src={user.presence.img} className="other-color" alt="" />
                  <label className="other-hover-name">
                    {user.presence.name}
                  </label>
                </div>
              );
            })}
        </div>
      </h1>

      <section className="apispec-info-section">
        <h2 className="apispec-project-title">{store && store.pjt.title}</h2>
      </section>

      <section className="apispec-controller-container">
        <article className="controller-list">
          <div className="controller-list-overflow">
            {store.pjt.controllers &&
              store.pjt.controllers.map((controller: any, i: number) => {
                return (
                  <div
                    className={`controller-block ${
                      controllerIdx === i && 'on'
                    }`}
                    onClick={() => onControllerBlockClick(i)}
                    key={i}
                  >
                    {controller.name} &nbsp;
                    {store.pjt.editors &&
                      store.pjt.editors.find(
                        (edt: any) =>
                          edt.space === 'CONTROLLER' &&
                          edt.sid === controller.id,
                      ) && (
                        <div className="editor-color-container" key={i}>
                          <img
                            src={
                              store.pjt.editors.find(
                                (edt: any) =>
                                  edt.space === 'CONTROLLER' &&
                                  edt.sid === controller.id,
                              ).img || DefaultProfile
                            }
                            className="editor-color"
                            alt="편집자 프로필 이미지"
                          />
                          <label className="editor-hover-name">
                            {
                              store.pjt.editors.find(
                                (edt: any) =>
                                  edt.space === 'CONTROLLER' &&
                                  edt.sid === controller.id,
                              ).name
                            }
                          </label>
                        </div>
                      )}
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => onHandleControllerClick(i, controller.id)}
                      className="controller-block-edit"
                    />
                  </div>
                );
              })}
            <div
              className="controller-block plus"
              onClick={() => onHandleControllerClick(-1, 0)}
            >
              <FontAwesomeIcon icon={faPlus} />
              {store.pjt.editors &&
                store.pjt.editors.find(
                  (edt: any) => edt.space === 'CONTROLLER' && edt.sid === 0,
                ) && (
                  <div className="editor-color-container">
                    <img
                      src={
                        store.pjt.editors.find(
                          (edt: any) =>
                            edt.space === 'CONTROLLER' && edt.sid === 0,
                        ).img || DefaultProfile
                      }
                      className="editor-color"
                      alt="편집자 프로필 이미지"
                    />
                    <label className="editor-hover-name">
                      {
                        store.pjt.editors.find(
                          (edt: any) =>
                            edt.space === 'CONTROLLER' && edt.sid === 0,
                        ).name
                      }
                    </label>
                  </div>
                )}
            </div>
          </div>
        </article>
        <article className="datatype-container" onClick={onDatatypeClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
          &nbsp; 자료형 관리
          {store.pjt.editors &&
            store.pjt.editors.find((edt: any) => edt.space === 'DATATYPE') && (
              <div className="editor-abs-container">
                <div className="editor-rel-container">
                  <img
                    src={
                      store.pjt.editors.find(
                        (edt: any) => edt.space === 'DATATYPE',
                      ).img || DefaultProfile
                    }
                    className="editor-color"
                    alt="편집자 프로필 이미지"
                  />
                  <label className="editor-hover-name">
                    {
                      store.pjt.editors.find(
                        (edt: any) => edt.space === 'DATATYPE',
                      ).name
                    }
                  </label>
                </div>
              </div>
            )}
        </article>
      </section>

      <APIList controllerIdx={controllerIdx} store={store} />

      {isControllerAddModalOpen && (
        <ControllerAddModal
          setIsControllerAddModalOpen={setIsControllerAddModalOpen}
          clickControllerIdx={clickControllerIdx}
          setControllerIdx={setControllerIdx}
          store={store}
        />
      )}

      {isDatatypeModalOpen && (
        <DatatypeModal
          setIsDatatypeModalOpen={setIsDatatypeModalOpen}
          store={store}
        />
      )}

      {isAlertModalOpen && (
        <TimerModal
          text="한 번에 한 명의 유저만이 편집할 수 있는 설정입니다."
          setIsOpen={setIsAlertModalOpen}
        />
      )}

      {others
        .filter((user) => user.presence.step === 4)
        .map((user) => (
          <Cursor key={user.id} {...user.presence} />
        ))}
    </div>
  );
}
