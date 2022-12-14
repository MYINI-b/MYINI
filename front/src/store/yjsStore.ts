import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { USER, JIRA } from 'types/Setting';
import { ROW, CATEGORY } from 'types/Requirement';
import { CONTROLLER, API, EDITOR } from 'types/ApiSpec';

export type ProjectInfo = {
  // project info
  img: string;
  title: string;
  desc: string;
  startDay: string;
  endDay: string;
  gitLink: string;
  jiraLink: string;
  notionLink: string;
  figmaLink: string;
  members: USER[];
  jiraMembers: USER[];

  // requirement
  rows: ROW[];
  categories: CATEGORY[];

  // controllers
  editors: EDITOR[];

  controllers: CONTROLLER[];
  currentAPI: API;

  // erd
  erdData: string;
  // jira
  jiraId: string; // 내 지라 아이디(이메일)
  jiraApiKey: string; // 내 지라 api key
  jiraDomain: string; // 프로젝트 지라 도메인
  JiraProject: JIRA[];
  JiraProjectId: string;
  JiraProjectKey: string;
};

export const globalStore = syncedStore({
  pjt: {} as ProjectInfo,
});
export const globalStore2 = syncedStore({
  pjt: {} as ProjectInfo,
});

// export const id = new WebrtcProvider('id', getYjsValue(globalStore) as any); // sync via webrtc
// export const id2 = new WebrtcProvider('id2', getYjsValue(globalStore2) as any); // sync via webrtc
