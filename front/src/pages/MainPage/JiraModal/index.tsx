import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { patchApi } from 'api';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import './style.scss';

function JiraModal({ modalJiraClose }: { modalJiraClose: any }) {
  const getJiraMail = useSelector((state: any) => state.member.memberJiraEmail);
  const [jiraMail, editJiraMail] = useState('');

  useEffect(() => {}, []);

  const onCloseModal = (e: any) => {
    if (e.target === e.currentTarget) {
      modalJiraClose();
    }
  };

  const onChange = (e: any) => {
    const getMail = e.target.value;
    editJiraMail(getMail);
  };

  const patchJiraMail = () => {
    const data = { memberJiraEmail: jiraMail };
    const sendJiraMail = async () => {
      await patchApi(`/members/jiraemail`, data);
    };
    sendJiraMail();
  };

  return (
    <div className="modal-pjt-container" onClick={onCloseModal}>
      <div className="modal-pjt-detail">
        <div className="modal-pjt-title">
          <h2>내 Jira정보</h2>
          <FontAwesomeIcon
            icon={faXmark}
            className="modal-pjt-button-close"
            onClick={modalJiraClose}
          />
        </div>
        <div className="modal-jira-content">
          <div className="modal-jira-content-title">
            <h4>현재 Jira 이메일</h4>
            <hr />
            <span>{getJiraMail}</span>
          </div>
          <div className="modal-jira-input-container">
            <h4>지라 이메일 등록</h4>
            <hr />
            <form action="">
              <input
                type="email"
                name="email"
                className="jira-input"
                placeholder="jira이메일을 입력하세요."
                onChange={onChange}
                required
              />
              <button
                type="submit"
                className="jira-save-btn"
                onClick={patchJiraMail}
              >
                저장
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default JiraModal;
