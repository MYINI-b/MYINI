/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';

import { globalStore, ProjectInfo } from 'store/yjsStore';
import { getApi, postApi, putApi } from 'api';
import DefaultProfile from 'assets/default-profile.png';
// import { PROJECT_LIST } from 'types/main';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import ProjectJira from './Jira';
import './style.scss';

interface Props {
  pid: string;
}
export default function SettingPage({ pid }: Props) {
  const [store, setStore] = useState<any>(useSyncedStore(globalStore));
  const [modalOpen, setModalOpen] = useState(false);
  const modalClose = () => {
    setModalOpen(!modalOpen);
  };

  const editProjectInfo = useCallback(async () => {
    const body = {
      projectName: store.pjt.title,
      projectDescription: store.pjt.desc,
      projectStartedDate: store.pjt.startDay,
      projectFinishedDate: store.pjt.endDay,
      projectGithubUrl: store.pjt.gitLink,
      projectJiraUrl: store.pjt.jiraLink,
      projectNotionUrl: store.pjt.notionLink,
      projectFigmaUrl: store.pjt.figmaLink,
    };
    const resp = await putApi(`/projects/${pid}`, body);
    // console.log(resp);
  }, [store]);

  const editJiraInfo = useCallback(async () => {
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
    store.pjt.jiraProject = jiraResp.data;
  }, [store]);

  useEffect(() => {
    const getProjectDetail = async () => {
      const projectResp: any = await getApi(`/projects/${pid}`);
      console.log(projectResp.data);
      if (projectResp.status === 200) {
        store.pjt.img = `https://myini.s3.ap-northeast-2.amazonaws.com/projectProfile/${projectResp.data.projectImg}`;
        store.pjt.title = projectResp.data.projectName;
        store.pjt.desc = projectResp.data.projectDescription;
        store.pjt.startDay = projectResp.data.projectStartedDate;
        store.pjt.endDay = projectResp.data.projectFinishedDate;
        store.pjt.gitLink = projectResp.data.projectGithubUrl;
        store.pjt.jiraLink = projectResp.data.projectJiraUrl;
        store.pjt.notionLink = projectResp.data.projectNotionUrl;
        store.pjt.figmaLink = projectResp.data.projectFigmaUrl;

        const memberResp: any = await getApi(`/projects/members/${pid}`);
        // console.log(memberResp);
        const memberData = memberResp.data.map((member: any) => {
          return {
            id: member.memberId,
            name: member.memberNickName,
            img: member.memberProfileImg
              ? `https://myini.s3.ap-northeast-2.amazonaws.com/userProfile/${member.memberProfileImg}`
              : DefaultProfile,
            email: member.memberEmail,
          };
        });
        store.pjt.members = memberData;
      } else if (projectResp.response.status === 400) alert('없는 프젝');
      else if (projectResp.response.status === 500) alert('api 에러');
    };
    const initNewProject = async () => {
      const { data }: any = await postApi(`/projects`);
      const newStore = syncedStore({
        pjt: {} as ProjectInfo,
      });
      new WebrtcProvider(`id${data.projectId}`, getYjsValue(newStore) as any);
      setStore(newStore);
    };
    if (pid === 'new') initNewProject();
    else getProjectDetail();
  }, []);

  return (
    <div className="setting-page">
      {pid && (
        <div className="setting-components">
          <ImageTitle
            store={store}
            pid={pid}
            editProjectInfo={editProjectInfo}
          />
          <div className="bottom-side">
            <div className="left-side">
              <ProjectDesc store={store} editProjectInfo={editProjectInfo} />
              <Period store={store} editProjectInfo={editProjectInfo} />
              <ReferenceLink store={store} editProjectInfo={editProjectInfo} />
            </div>
            <div className="right-side">
              <ProjectJira
                store={store}
                pid={pid}
                editJiraInfo={editJiraInfo}
              />
              <ProjectMember
                store={store}
                pid={pid}
                editProjectInfo={editProjectInfo}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
