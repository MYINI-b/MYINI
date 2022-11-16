import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import {
  faFileCircleQuestion,
  faXmark,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { putApi, getApi } from 'api';
import Loading from 'assets/loading.gif';

interface Props {
  store: any;
  modalClose: any;
  pid: string;
}

function Modal({ store, modalClose, pid }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(false);

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

  const editJiraInfo = useCallback(async () => {
    setIsLoading(true);
    setInitialLoading(true);
    const body = {
      jiraId: store.pjt.jiraId,
      jiraApiKey: store.pjt.jiraApiKey,
    };
    const body1 = {
      jiraDomain: store.pjt.jiraDomain,
    };

    const resp = await putApi(
      `https://k7b203.p.ssafy.io/api/jiras/${pid}/jiraaccount`,
      body,
    );
    const resp1 = await putApi(
      `https://k7b203.p.ssafy.io/api/jiras/${pid}/jiradomain`,
      body1,
    );
    const jiraResp: any = await getApi(
      `https://k7b203.p.ssafy.io/api/jiras/${pid}/projects`,
    );
    console.log(resp, resp1, jiraResp);
    store.pjt.jiraProject = jiraResp.data;
    setIsLoading(false);
  }, [store]);

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

              {initialLoading && isLoading && (
                <img src={Loading} alt="jira" className="loading-img" />
              )}
            </div>
          </div>
          <div className="jira-content-button" onClick={editJiraInfo}>
            프로젝트 찾기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
