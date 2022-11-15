/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import { useOthers, useUpdatePresence } from '@y-presence/react';
import { UserPresence } from 'types/main';

import { getApi, putApi } from 'api';
import DefaultProfile from 'assets/default-profile.png';
import { Cursor } from 'components/Cursor';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import ProjectJira from './Jira';
import './style.scss';

interface Props {
  store: any;
  pid: string;
}
export default function Setting({ store, pid }: Props) {
  const others = useOthers<UserPresence>();
  const updatePresence = useUpdatePresence<UserPresence>();

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
    console.log(resp, resp1, jiraResp);
    store.pjt.jiraProject = jiraResp.data;
  }, [store]);

  const handlePointMove = React.useCallback(
    (e: React.PointerEvent) => {
      updatePresence({
        cursor: {
          x: e.clientX,
          y: e.clientY,
        },
        step: 1,
      });
    },
    [updatePresence],
  );

  useEffect(() => {
    const getProjectDetail = async () => {
      const { data }: any = await getApi(`/projects/${pid}`);
      console.log(data, store, pid);

      if (store && pid !== '') {
        store.pjt.img = data.projectImg
          ? `https://myini.s3.ap-northeast-2.amazonaws.com/projectProfile/${data.projectImg}`
          : DefaultProfile;
        store.pjt.title = data.projectName;
        store.pjt.desc = data.projectDescription;
        store.pjt.startDay = data.projectStartedDate;
        store.pjt.endDay = data.projectFinishedDate;
        store.pjt.gitLink = data.projectGithubUrl;
        store.pjt.jiraLink = data.projectJiraUrl;
        store.pjt.notionLink = data.projectNotionUrl;
        store.pjt.figmaLink = data.projectFigmaUrl;
        if (!store.pjt.editors) store.pjt.editors = [];

        const memberResp: any = await getApi(`/projects/members/${pid}`);

        const memberData = memberResp.data.map((member: any) => {
          return {
            id: member.memberId,
            name: member.memberNickName,
            img: member.memberProfileImg
              ? `${member.memberProfileImg}`
              : DefaultProfile,
            email: member.memberEmail,
          };
        });

        const jiraResp: any = await getApi(`/projects/members/${pid}/jiras`);
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
        store.pjt.members = memberData;
      }
    };

    getProjectDetail();
  }, [store, pid]);

  return (
    <div className="setting-page" onPointerMove={handlePointMove}>
      {!!pid && store && (
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

          <div className="others-container">
            {others
              .filter((user) => user.presence.step === 1)
              .map((user: any, i: number) => {
                return (
                  <div className="other-card" key={i}>
                    <img
                      src={user.presence.img}
                      alt=""
                      className="other-color"
                    />
                    <label>&nbsp;{user.presence.name}</label>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {others
        .filter((user) => user.presence.step === 1)
        .map((user) => (
          <Cursor key={user.id} {...user.presence} />
        ))}
    </div>
  );
}
