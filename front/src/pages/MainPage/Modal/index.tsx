import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useCallback } from 'react';
import { deleteApi, getApi } from 'api';
import { faTrash, faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

// types
import { PROJECT_LIST } from 'types/main';

function Modal({ modalClose }: { modalClose: any }) {
  const [pjtList, setPjtList] = useState<PROJECT_LIST[]>([]);

  const deletePjt = async (pid: any) => {
    const deletePjtData: any = await deleteApi(`projects/${pid}`);
  };

  useEffect(() => {
    const fetchProject = async () => {
      const getProjectDatas: any = await getApi(`/projects`);
      setPjtList(getProjectDatas.data);
    };
    fetchProject();
  }, [deletePjt]);

  const onCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  return (
    <div className="modal-pjt-container" onClick={onCloseModal}>
      <div className="modal-pjt-detail">
        <div className="modal-pjt-button-wrapper">
          <FontAwesomeIcon
            icon={faXmark}
            className="modal-pjt-button-close"
            onClick={modalClose}
          />
        </div>
        <div className="modal-pjt-title">
          <h2>프로젝트 명</h2>
        </div>
        <div className="modal-pjt-content">
          {pjtList.map((content) => {
            return (
              <div key={content.projectId} className="modal-pjt-content-detail">
                <span>{content.projectName}</span>
                <FontAwesomeIcon
                  icon={faTrash}
                  className="modal-pjt-content-detail-delete-btn"
                  onClick={() => deletePjt(content.projectId)}
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Modal;
