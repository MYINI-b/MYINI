import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useCallback, useEffect, useState } from 'react';

import useInput from 'hooks/useInput';
import useNoSpaceInput from 'hooks/useNoSpaceInput';
import Tooltip from 'components/Tooltip';
import './style.scss';
import { CONTROLLER, API } from 'types/ApiSpec';

interface Props {
  controllers: Array<CONTROLLER>;
  setControllers: Dispatch<React.SetStateAction<CONTROLLER[]>>;
  setIsControllerAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
  clickControllerIdx: number;
  setControllerIdx: Dispatch<React.SetStateAction<number>>;
  apis: API[][];
  setApis: React.Dispatch<React.SetStateAction<API[][]>>;
}

export default function ControllerAddModal({
  controllers,
  setControllers,
  setIsControllerAddModalOpen,
  clickControllerIdx,
  setControllerIdx,
  apis,
  setApis,
}: Props) {
  const [controllerName, onControllerNameChange, setControllerName] =
    useNoSpaceInput('');
  const [controllerDesc, onControllerDescChange, setControllerDesc] =
    useInput('');
  const [controllerBaseURL, setControllerBaseURL] = useState('');

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    if (clickControllerIdx >= 0) {
      const curController = { ...controllers[clickControllerIdx] };
      setControllerName(curController.name);
      setControllerDesc(curController.desc);
      setControllerBaseURL(curController.baseurl);
      setIsEdit(true);
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
    (e: any) => {
      e.preventDefault();
      const controllerObj = {
        name: controllerName,
        desc: controllerDesc,
        baseurl: controllerBaseURL,
      };

      if (clickControllerIdx >= 0) {
        const copyControllerArr = [...controllers];
        copyControllerArr[clickControllerIdx] = controllerObj;

        setControllers(copyControllerArr);
        setControllerIdx(clickControllerIdx);
      } else {
        setControllers([...controllers, controllerObj]);
        setApis([...apis, []]);
        setControllerIdx(0);
      }
      setIsControllerAddModalOpen(false);
    },
    [
      controllerName,
      controllerDesc,
      controllerBaseURL,
      controllers,
      apis,
      clickControllerIdx,
      setControllers,
      setIsControllerAddModalOpen,
    ],
  );

  const deleteController = useCallback(() => {
    const copyControllerArr = [...controllers].filter(
      (e, i) => i !== clickControllerIdx,
    );
    const copyApisArr = [...apis].filter((e, i) => i !== clickControllerIdx);
    setControllers(copyControllerArr);
    setApis(copyApisArr);
    setIsControllerAddModalOpen(false);
  }, [apis, controllers, clickControllerIdx]);

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
          {isEdit ? (
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
