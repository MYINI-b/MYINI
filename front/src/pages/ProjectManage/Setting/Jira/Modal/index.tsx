import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import {
  faFileCircleQuestion,
  faXmark,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { putApi } from 'api';

interface Props {
  store: any;
  modalClose: any;
  pid: string;
  editJiraInfo: () => Promise<void>;
}

function Modal({ store, modalClose, pid, editJiraInfo }: Props) {
  const onSubmitClick = useCallback(() => {
    editJiraInfo();
  }, []);

  const onCloseModal = (e: any) => {
    // console.log('e.target: ', e.target);
    // console.log('e.tarcurrentTargetget: ', e.currentTarget);
    if (e.target === e.currentTarget) {
      modalClose();
    }
  };

  const handleTextJiraId = useCallback(
    (e: any) => {
      store.pjt.jiraId = e.target.value;
    },
    [store],
  );
  const handleTextJiraApiKey = useCallback(
    (e: any) => {
      store.pjt.jiraApiKey = e.target.value;
    },
    [store],
  );
  const handleTextJiraDomain = useCallback(
    (e: any) => {
      store.pjt.jiraDomain = e.target.value;
    },
    [store],
  );
  const handleTextJira = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const button: HTMLButtonElement = e.currentTarget;
      store.pjt.jiraProjectId = e.currentTarget.value;
      store.pjt.jiraProject.forEach((value: any) => {
        if (value.jiraProjectId === store.pjt.jiraProjectId) {
          store.pjt.jiraProjectKey = value.jiraProjectKey;
          store.pjt.jiraProjectName = value.jiraProjectName;
        }
      });
      const body = {
        jiraProjectId: store.pjt.jiraProjectId,
        jiraProjectKey: store.pjt.jiraProjectKey,
        jiraProjectName: store.pjt.jiraProjectName,
      };
      const resp = putApi(
        `https://k7b203.p.ssafy.io/api/jiras/${pid}/jiraproject`,
        body,
      );
      console.log(resp);
      modalClose();
    },
    [store],
  );
  console.log(store.pjt.jiraProjectId);
  return (
    <div className="modal-jira-container" onClick={onCloseModal}>
      <div className="modal-jira-detail">
        <div className="modal-jira-title">
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="modal-jira-button-left"
              href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md"
            />
          </a>
          <FontAwesomeIcon
            icon={faXmark}
            className="modal-jira-button-right"
            onClick={modalClose}
          />
        </div>
        <div className="modal-jira-content">
          <input
            className="jira-content-input"
            placeholder="Jira ID"
            onChange={handleTextJiraId}
            defaultValue={store.pjt.jiraId}
          />
          <input
            className="jira-content-input"
            placeholder="API Key"
            onChange={handleTextJiraApiKey}
            defaultValue={store.pjt.jiraApiKey}
          />
          <input
            className="jira-content-input"
            placeholder="도메인"
            onChange={handleTextJiraDomain}
            defaultValue={store.pjt.jiraDomain}
          />
          <div className="jira-content-button" onClick={onSubmitClick}>
            프로젝트 찾기
          </div>
          <div className="jira-projects-overflow">
            <div className="jira-project-category">
              {store.pjt.jiraProject &&
                store.pjt.jiraProject.map((item: any, idx: number) => (
                  <button
                    type="button"
                    className="jira-project-category-item"
                    onClick={handleTextJira}
                    value={item.jiraProjectId}
                    key={idx}
                  >
                    {item.jiraProjectName}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
