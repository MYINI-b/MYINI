/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react';
import { useSyncedStore } from '@syncedstore/react';
import { useParams, useNavigate } from 'react-router-dom';

import { globalStore } from 'store/yjsStore';
import { getApi } from 'api';
import DefaultProfile from 'assets/default-profile.png';
import ImageTitle from './ImageTitle';
import ProjectDesc from './ProjectDesc/index';
import Period from './Period/index';
import ReferenceLink from './ReferenceLink';
import ProjectMember from './Member/index';
import './style.scss';

export default function SettingPage() {
  const store = useSyncedStore(globalStore);
  const { pid } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProjectDetail = async () => {
      const { data }: any = await getApi(`/projects/${pid}`);
      console.log(data);
      if (data) {
        store.pjt.img = `https://myini.s3.ap-northeast-2.amazonaws.com/projectProfile/${data.projectImg}`;
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
            name: member.memberName,
            img: member.memberProfileImg
              ? `https://myini.s3.ap-northeast-2.amazonaws.com/userProfile/${member.memberProfileImg}`
              : DefaultProfile,
            email: member.memberEmail,
          };
        });
        store.pjt.members = memberData;
      } else {
        alert('없는 프젝');
      }
    };

    getProjectDetail();
  }, []);

  return (
    <div className="setting-page">
      <div className="setting-components">
        <ImageTitle store={store} />
        <div className="bottom-side">
          <div className="left-side">
            <ProjectDesc store={store} />
            <Period store={store} />
            <ReferenceLink store={store} />
          </div>
          <div className="right-side">
            <ProjectMember store={store} />
          </div>
        </div>
      </div>
    </div>
  );
}
