/* eslint-disable react/jsx-props-no-spreading */
import React, { useMemo } from 'react';
import { ProjectImage } from './ImageTitle/index';
import { DetailInfo } from './ProjectDetail/index';
import { ProjectPeriod } from './Period/index';
import { ProjectLink } from './Link/index';
import { ProjectMember } from './Member/index';
import MockData from './mock.json';
import './style.scss';

export default function SettingPage() {
  const data = useMemo(() => MockData[0], []);
  const Props = {
    id: data.id,
    img: data.img,
    title: data.title,
    period: data.period,
    jiralink: data.jiralink,
    notionlink: data.notionlink,
    gitlink: data.gitlink,
    figmalink: data.figmalink,
    detailinfo: data.detailinfo,
    member: data.member,
  };
  // console.log(data);
  return (
    <div className="setting-page">
      <div className="setting-components">
        <div className="top-side">
          <ProjectImage {...Props} className="project-image" />
        </div>
        <div className="bottom-side">
          <div className="left-side">
            <DetailInfo {...Props} className="detail-info" />
            <ProjectPeriod {...Props} className="project-period" />
            <ProjectLink {...Props} className="project-link" />
          </div>
          <div className="right-side">
            <ProjectMember {...Props} className="project-member" />
          </div>
        </div>
      </div>
    </div>
  );
}
