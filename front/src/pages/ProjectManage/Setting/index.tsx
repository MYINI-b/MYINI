/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState, useCallback } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import { useParams, useNavigate } from 'react-router-dom';
import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { useSelector } from 'react-redux';
import { RootState } from 'modules/Reducers';

import { globalStore, ProjectInfo } from 'store/yjsStore';
import { getApi, putApi } from 'api';
import DefaultProfile from 'assets/default-profile.png';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import './style.scss';

interface Props {
  store: any;
  pid: string;
}
export default function Setting({ store, pid }: Props) {
  // const { pid } = useSelector((state: RootState) => state.project);

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
    console.log(resp);
  }, [store]);

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

        const memberResp: any = await getApi(`/projects/members/${pid}`);
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
      }
    };

    getProjectDetail();
  }, [store, pid]);

  return (
    <div className="setting-page">
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
