import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useCallback } from 'react';
import { patchApi } from 'api';
import { faXmark, faCircleInfo } from '@fortawesome/free-solid-svg-icons';
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

  const onChange = useCallback((e: any) => {
    editJiraMail(e.target.value);
  }, []);

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
  }, [myInfo, jiraMail]);

  return (
    <div className="jiramodal-pjt-container" onClick={onCloseModal}>
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
            <div className="modal-jira-input-title">
              <h4>지라 이메일 등록</h4>
              <a
                href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md#1-%EC%A7%80%EB%9D%BC%EC%9D%B4%EB%A9%94%EC%9D%BC-%EB%93%B1%EB%A1%9D"
                target="_blank"
                rel="noreferrer"
              >
                <FontAwesomeIcon
                  icon={faCircleInfo}
                  className="jira-input-info-tooltip"
                />
              </a>
            </div>
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
