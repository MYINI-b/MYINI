import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useCallback, useState } from 'react';
import {
  faFileCircleQuestion,
  faXmark,
  faCircleQuestion,
} from '@fortawesome/free-solid-svg-icons';
import './style.scss';
import { putApi, getApi } from 'api';
import DefaultProfile from 'assets/default-profile.png';
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
  const selectJiraProject = useCallback(
    async (item: any) => {
      store.pjt.jiraProjectId = item.jiraProjectId;
      store.pjt.jiraProjectKey = item.jiraProjectKey;

      const body = {
        jiraProjectId: item.jiraProjectId,
        jiraProjectKey: item.jiraProjectKey,
        jiraProjectName: item.jiraProjectName,
      };
      // 연동된 지라 프로젝트 수정
      const resp: any = await putApi(`/jiras/${pid}/jiraproject`, body);

      const jiraResp: any = await getApi(`/projects/members/${pid}/jiras`);

      if (jiraResp.status === 200) {
        const jiraData = jiraResp.data.map((member: any) => {
          return {
            id: member.memberId,
            name: member.memberName,
            img: member.memberProfileImg
              ? `${member.memberProfileImg}`
              : DefaultProfile,
            email: member.memberEmail,
            nickname: member.memberNickName,
          };
        });
        store.pjt.jiraMembers = jiraData;
      } else {
        store.pjt.jiraMembers = [];
      }
      modalClose();
    },
    [store],
  );

  const searchJiraProject = useCallback(async () => {
    setIsLoading(true);
    setInitialLoading(true);
    const body = {
      jiraId: store.pjt.jiraId,
      jiraApiKey: store.pjt.jiraApiKey,
    };
    const body1 = {
      jiraDomain: store.pjt.jiraDomain,
    };

    // 지라 계정 수정
    const resp: any = await putApi(`/jiras/${pid}/jiraaccount`, body);
    // 지라 도메인 수정
    const resp1: any = await putApi(`/jiras/${pid}/jiradomain`, body1);
    // 등록된 지라 계정, 도메인 바탕으로 지라 프로젝트 리스트 조회
    const jiraResp: any = await getApi(`/jiras/${pid}/projects`);
    console.log(jiraResp.data);
    store.pjt.jiraProject = jiraResp.data;
    setIsLoading(false);
  }, [store]);

  return (
    <div className="modal-jira-container" onClick={onCloseModal}>
      <div className="modal-jira-detail">
        <div className="modal-jira-title">
          <a
            href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md#2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%97%B0%EB%8F%99"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon
              icon={faCircleQuestion}
              className="modal-jira-button-left"
              href="https://github.com/wooobinkim/myini/blob/main/docs/MYINIGuide.md#2-%ED%94%84%EB%A1%9C%EC%A0%9D%ED%8A%B8%EC%9D%98-%EC%97%B0%EB%8F%99"
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
            value={store.pjt.jiraId}
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
                    onClick={() => selectJiraProject(item)}
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
          <div className="jira-content-button" onClick={searchJiraProject}>
            프로젝트 찾기
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
