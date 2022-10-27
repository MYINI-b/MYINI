import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Dispatch, useCallback } from 'react';

import useInput from 'hooks/useInput';
import './style.scss';

interface CONTROLLER {
  name: string;
  desc: string;
  baseurl: string;
}

interface Props {
  controllers: Array<CONTROLLER>;
  setControllers: Dispatch<React.SetStateAction<CONTROLLER[]>>;
  setIsControllerAddModalOpen: Dispatch<React.SetStateAction<boolean>>;
}

export default function ControllerAddModal({
  controllers,
  setControllers,
  setIsControllerAddModalOpen,
}: Props) {
  const [controllerName, onControllerNameChange] = useInput('');
  const [controllerDesc, onControllerDescChange] = useInput('');
  const [controllerBaseURL, onControllerBaseURLChange] = useInput('');

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
      setControllers([...controllers, controllerObj]);
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

  return (
    <section className="modal-empty" onClick={closeModal}>
      <form
        className="controller-add-modal-content"
        onClick={(e) => e.stopPropagation()}
        onSubmit={addController}
      >
        <div className="closebtn-container" onClick={closeModal}>
          <FontAwesomeIcon icon={faClose} />
        </div>
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="컨트롤러 명"
          onChange={onControllerNameChange}
        />
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="컨트롤러 설명"
          onChange={onControllerDescChange}
        />
        <input
          type="text"
          className="controller-add-input"
          required
          placeholder="Base URL"
          onChange={onControllerBaseURLChange}
        />
        <button className="controller-add-submit" type="submit">
          확인
        </button>
      </form>
    </section>
  );
}
