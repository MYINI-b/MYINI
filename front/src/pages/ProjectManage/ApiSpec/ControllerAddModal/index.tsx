import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { RootState } from 'modules';
import { useSelector } from 'react-redux';
import useInput from 'hooks/useInput';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import Tooltip from 'components/Tooltip';
import { deleteApi, postApi, putApi } from 'api';
import './style.scss';
import { CONTROLLER, API } from 'types/ApiSpec';

interface Props {
  setIsControllerAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  clickControllerIdx: number;
  setControllerIdx: Dispatch<React.SetStateAction<number>>;
  store: any;
}

export default function ControllerAddModal({
  setIsControllerAddModalOpen,
  clickControllerIdx,
  setControllerIdx,
  store,
}: Props) {
  const { pid } = useSelector((state: RootState) => state.project);
  const [controllerName, onControllerNameChange, setControllerName] =
    useNoSpaceInput('');
  const [controllerDesc, onControllerDescChange, setControllerDesc] =
    useInput('');
  const [controllerBaseURL, setControllerBaseURL] = useState('');

  useEffect(() => {
    if (clickControllerIdx >= 0) {
      const curController = { ...store.pjt.controllers[clickControllerIdx] };
      setControllerName(curController.name);
      setControllerDesc(curController.desc);
      setControllerBaseURL(curController.baseurl.substring(1));
    }
  }, []);

  const closeModal = useCallback(() => {
    setIsControllerAddModalOpen(false);
  }, [setIsControllerAddModalOpen]);

  const onControllerBaseURLChange = useCallback(
    (e: any) => {
      const newBaseURL = e.target.value.substring(1);
      setControllerBaseURL(newBaseURL.trim());
    },
    [controllerBaseURL],
  );

  const addController = useCallback(
    async (e: any) => {
      e.preventDefault();

      const body = {
        apiControllerName: controllerName,
        apiControllerBaseUrl: `/${controllerBaseURL}`,
        apiControllerDescription: controllerDesc,
      };

      if (clickControllerIdx >= 0) {
        const controllerId = store.pjt.controllers[clickControllerIdx].id;
        const { data }: any = await putApi(
          `/apidocs/controllers/${controllerId}`,
          body,
        );
        console.log(data);

        store.pjt.controllers[clickControllerIdx].name = controllerName;
        store.pjt.controllers[clickControllerIdx].desc = controllerDesc;
        store.pjt.controllers[
          clickControllerIdx
        ].baseurl = `/${controllerBaseURL}`;

        setControllerIdx(clickControllerIdx);
      } else {
        const { data }: any = await postApi(
          `/apidocs/${pid}/controllers`,
          body,
        );

        store.pjt.controllers.push({
          id: data.apiControllerId,
          name: controllerName,
          desc: controllerDesc,
          baseurl: `/${controllerBaseURL}`,
          responses: [],
        });
        setControllerIdx(0);
      }
      setIsControllerAddModalOpen(false);
    },
    [
      controllerName,
      controllerDesc,
      controllerBaseURL,
      store,
      clickControllerIdx,
      setIsControllerAddModalOpen,
    ],
  );

  const deleteController = useCallback(async () => {
    const controllerId = store.pjt.controllers[clickControllerIdx].id;
    const { data }: any = await deleteApi(
      `/apidocs/controllers/${controllerId}`,
    );

    console.log(data);

    store.pjt.controllers.splice(clickControllerIdx, 1);
    setIsControllerAddModalOpen(false);
  }, [store, clickControllerIdx]);

  return (
    <section className="modal-empty" onClick={closeModal}>
      <form
        className="controller-add-modal-content"
        onClick={(e) => e.stopPropagation()}
        onSubmit={addController}
      >
        <div className="closebtn-container">
          <FontAwesomeIcon icon={faClose} onClick={closeModal} />
        </div>
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="컨트롤러 명"
          onChange={onControllerNameChange}
          value={controllerName}
        />
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="컨트롤러 설명"
          onChange={onControllerDescChange}
          value={controllerDesc}
        />
        <Tooltip text="소문자 복수형으로 작성해주세요.">
          <input
            type="text"
            className="controller-add-input"
            required
            placeholder="Base URL"
            onChange={onControllerBaseURLChange}
            value={`/${controllerBaseURL}`}
          />
        </Tooltip>
        <div className="controller-btn-wrapper">
          {clickControllerIdx >= 0 ? (
            <>
              <button
                className="controller-add-submit "
                type="button"
                onClick={deleteController}
              >
                삭제
              </button>
              <button className="controller-add-submit" type="submit">
                수정
              </button>
            </>
          ) : (
            <button className="controller-add-submit" type="submit">
              확인
            </button>
          )}
        </div>
      </form>
    </section>
  );
}
