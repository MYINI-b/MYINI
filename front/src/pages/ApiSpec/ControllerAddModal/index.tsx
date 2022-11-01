import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useCallback, useEffect, useState } from 'react';

import useInput from 'hooks/useInput';
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
    useInput('');
  const [controllerDesc, onControllerDescChange, setControllerDesc] =
    useInput('');
  const [controllerBaseURL, onControllerBaseURLChange, setControllerBaseURL] =
    useInput('');
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

  const addController = useCallback(
    (e: any) => {
      e.preventDefault();
      const controllerObj = {
        name: controllerName,
        desc: controllerDesc,
        baseurl: controllerBaseURL,
      };

      if (clickControllerIdx >= 0) {
        const copyArr = [...controllers];
        copyArr[clickControllerIdx] = controllerObj;
        setControllers(copyArr);
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
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="Base URL"
          onChange={onControllerBaseURLChange}
          value={controllerBaseURL}
        />
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
