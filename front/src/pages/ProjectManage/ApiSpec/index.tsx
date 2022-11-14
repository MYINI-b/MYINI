import { useState, useCallback, useEffect } from 'react';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircle,
  faPenToSquare,
  faPen,
  faPlus,
} from '@fortawesome/free-solid-svg-icons';

import './style.scss';
import { getApi } from 'api';
import { DTO } from 'types/ApiSpec';
import { Cursor } from 'components/Cursor';
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
  const [controllerIdx, setControllerIdx] = useState(-1); // 현재 선택된 컨트롤러 인덱스
  const [clickControllerIdx, setClickControllerIdx] = useState(0); // 현재 선택된 컨트롤러 인덱스

  const [isControllerAddModalOpen, setIsControllerAddModalOpen] =
    useState(false);
  const [isDatatypeModalOpen, setIsDatatypeModalOpen] = useState(false);
  const canEdit = false;

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

  const onHandleControllerClick = useCallback((idx: number) => {
    setClickControllerIdx(idx);
    setIsControllerAddModalOpen(true);
  }, []);

  const onDatatypeClick = useCallback(() => {
    setIsDatatypeModalOpen(true);
  }, []);

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
      <h1 className="apispec-title">API 명세서</h1>

      <section className="apispec-info-section">
        <h2 className="apispec-project-title">{store && store.pjt.title}</h2>
        <span className="apispec-status-span">
          <FontAwesomeIcon
            icon={faCircle}
            className={`apispec-status-icon ${canEdit ? 'on' : 'off'}`}
          />
          &nbsp;{canEdit ? '편집가능' : '편집불가'}
        </span>
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
                    {controller.name} &nbsp;{' '}
                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => onHandleControllerClick(i)}
                      className="controller-block-edit"
                    />
                  </div>
                );
              })}
            <div
              className="controller-block plus"
              onClick={() => onHandleControllerClick(-1)}
            >
              <FontAwesomeIcon icon={faPlus} />
            </div>
          </div>
        </article>
        <article className="datatype-container" onClick={onDatatypeClick}>
          <FontAwesomeIcon icon={faPenToSquare} />
          &nbsp; 자료형 관리
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
        <DatatypeModal setIsDatatypeModalOpen={setIsDatatypeModalOpen} />
      )}

      {others
        .filter((user) => user.presence.step === 4)
        .map((user) => (
          <Cursor key={user.id} {...user.presence} />
        ))}
    </div>
  );
}
