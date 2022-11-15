import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useCallback } from 'react';
import { patchApi } from 'api';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function JiraModal({
  modalJiraClose,
  myInfo,
  setMyInfo,
}: {
  modalJiraClose: any;
  myInfo: any;
  setMyInfo: React.Dispatch<React.SetStateAction<any>>;
}) {
  const [jiraMail, editJiraMail] = useState(myInfo.memberJiraEmail);

  const onCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      modalJiraClose();
    }
  };

  const onChange = (e: any) => {
    const getMail = e.target.value;
    editJiraMail(getMail);
  };

  const patchJiraMail = useCallback(() => {
    const data = { memberJiraEmail: jiraMail };
    const sendJiraMail = async () => {
      await patchApi(`/members/jiraemail`, data);
    };
    sendJiraMail();
    const copyInfo = { ...myInfo };
    copyInfo.memberJiraEmail = jiraMail;
    setMyInfo(copyInfo);
    modalJiraClose();
  }, [myInfo]);

  return (
    <div className="modal-pjt-container" onClick={onCloseModal}>
      <div className="modal-pjt-detail">
        <div className="modal-pjt-button-wrapper">
          <FontAwesomeIcon
            icon={faXmark}
            className="modal-pjt-button-close"
            onClick={modalJiraClose}
          />
        </div>
        <div className="modal-pjt-title">내 Jira정보</div>
        <div className="modal-jira-content">
          <div className="modal-jira-input-container">
            <h4>지라 이메일 등록</h4>
            <form action="">
              <input
                type="email"
                name="email"
                className="jira-input"
                placeholder="jira이메일을 입력하세요."
                onChange={onChange}
                value={jiraMail}
                required
              />
            </form>
          </div>
        </div>
        <button type="submit" className="jira-save-btn" onClick={patchJiraMail}>
          저장
        </button>
      </div>
    </div>
  );
}

export default JiraModal;
