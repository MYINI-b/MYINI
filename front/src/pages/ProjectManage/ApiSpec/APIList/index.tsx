/* eslint-disable @typescript-eslint/no-explicit-any */
import { useCallback, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector } from 'react-redux';

import { RootState } from 'modules/Reducers';
import './style.scss';
import ICON from 'assets/icon.png';
import { RESPONSE } from 'types/ApiSpec';
import DefaultProfile from 'assets/default-profile.png';
import TimerModal from 'components/TimerModal';
import ApiModal from '../ApiModal';

interface Props {
  store: any;
  controllerIdx: number;
}

export default function APIList({ store, controllerIdx }: Props) {
  const [isApiModalOpen, setIsApiModalOpen] = useState(false);
  const [alertText, setAlertText] = useState('');
  const [apiRowIdx, setApiRowIdx] = useState(-1);
  const { memberId, memberProfileImg, memberNickname } = useSelector(
    (state: RootState) => state.member,
  );

  const onApiRowClick = useCallback(
    (idx: number, aid: number) => {
      const findIdx = store.pjt.editors.findIndex(
        (x: any) => x.space === 'API' && x.sid === aid,
      );
      if (aid !== 0 && findIdx >= 0) {
        setAlertText('한 번에 한 명의 유저만이 편집할 수 있는 설정입니다.');
        return;
      }
      setApiRowIdx(idx);
      setIsApiModalOpen(true);
      if (idx !== -1)
        store.pjt.editors.push({
          id: memberId,
          space: 'API',
          sid: aid,
          img: memberProfileImg,
          name: memberNickname,
        });
      else if (idx === -1)
        store.pjt.editors.push({
          id: memberId,
          space: 'API',
          sid: aid,
          img: memberProfileImg,
          name: `controller${store.pjt.controllers[controllerIdx].id}`,
        });
    },
    [controllerIdx],
  );

  return (
    <section className="apilist-container">
      {store.pjt.controllers &&
        store.pjt.controllers.length > 0 &&
        controllerIdx >= 0 && (
          <>
            <p className="controller-desc">
              Description : {store.pjt.controllers[controllerIdx].desc}
            </p>
            <p className="controller-desc">
              BaseUrl : {store.pjt.controllers[controllerIdx].baseurl}
            </p>
            <article className="api-table-wrapper">
              <div className="api-table-row">
                <div className="api-table-col one" />
                <h3 className="api-table-col two title">ID</h3>
                <h3 className="api-table-col three title">이름</h3>
                <h3 className="api-table-col three title">URL</h3>
                <h3 className="api-table-col two title">메소드</h3>
                <h3 className="api-table-col two title">코드</h3>
              </div>

              <div className="api-table-tbody">
                <div className="api-table-overflow">
                  {store.pjt.controllers[controllerIdx].responses &&
                    store.pjt.controllers[controllerIdx].responses.map(
                      (api: RESPONSE, i: number) => {
                        return (
                          <div
                            className="api-table-row content"
                            key={i}
                            onClick={() => onApiRowClick(i, api.id)}
                          >
                            <div className="api-table-col one">
                              {store.pjt.editors &&
                                store.pjt.editors.find(
                                  (edt: any) =>
                                    edt.space === 'API' && edt.sid === api.id,
                                ) && (
                                  <div
                                    className="editor-color-container"
                                    key={i}
                                  >
                                    <img
                                      src={
                                        store.pjt.editors.find(
                                          (edt: any) =>
                                            edt.space === 'API' &&
                                            edt.sid === api.id,
                                        ).img || DefaultProfile
                                      }
                                      className="editor-color"
                                      alt="편집자 프로필 이미지"
                                    />
                                    <label className="editor-hover-name">
                                      {
                                        store.pjt.editors.find(
                                          (edt: any) =>
                                            edt.space === 'API' &&
                                            edt.sid === api.id,
                                        ).name
                                      }
                                    </label>
                                  </div>
                                )}
                            </div>
                            <h3 className="api-table-col two">{`${
                              store.pjt.controllers[controllerIdx].name
                            }-${i + 1}`}</h3>
                            <h3 className="api-table-col three">
                              {api.apiName}
                            </h3>
                            <h3 className="api-table-col three">{`${store.pjt.controllers[controllerIdx].baseurl}${api.url}`}</h3>
                            <h3 className="api-table-col two">
                              <span
                                className={`api-method-block ${api.method}`}
                              >
                                {api.method}
                              </span>
                            </h3>
                            <h3 className="api-table-col two">{api.code}</h3>
                          </div>
                        );
                      },
                    )}

                  <button
                    type="button"
                    className="api-add-button"
                    onClick={() => onApiRowClick(-1, 0)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </div>
            </article>
          </>
        )}

      {isApiModalOpen && (
        <ApiModal
          setIsApiModalOpen={setIsApiModalOpen}
          controllerIdx={controllerIdx}
          apiRowIdx={apiRowIdx}
          store={store}
        />
      )}

      {!!alertText && <TimerModal text={alertText} setText={setAlertText} />}
    </section>
  );
}
