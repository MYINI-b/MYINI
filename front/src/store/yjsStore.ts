import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { USER } from 'types/Setting';
import { ROW } from 'types/Requirement';

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

  // requirement
  rows: ROW[];
  categories: string[];
  managers: string[];
};

export const globalStore = syncedStore({
  pjt: {} as ProjectInfo,
});
new WebrtcProvider('id', getYjsValue(globalStore) as any); // sync via webrtc
