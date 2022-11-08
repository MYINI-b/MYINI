import React from 'react';
import './style.scss';

export type initDependenciesListType = {
  name: string;
  description: string;
  id: string;
};

function Modal({
  modalClose,
  initDependenciesList,
}: {
  modalClose: any;
  initDependenciesList: Array<initDependenciesListType>;
}) {
  const onCloseModal = (e: any) => {
    // console.log('e.target: ', e.target);
    // console.log('e.tarcurrentTargetget: ', e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };
  return (
    <div className="modal__container" onClick={onCloseModal}>
      <div className="modal">
        <div>
          Web, Security, JPA, Actuator, Devtools...
          <button type="button" className="modal__button" onClick={modalClose}>
            {' '}
            Modal Close
          </button>
        </div>
        {initDependenciesList.map((item, idx) => (
          <div key={idx}>
            {item.name}
            {item.description}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Modal;
