import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { USER } from 'types/Setting';

export type ProjectInfo = {
  title: string;
  desc: string;
  startDay: string;
  endDay: string;
  gitLink: string;
  jiraLink: string;
  notionLink: string;
  figmaLink: string;
  members: USER[];
};

export const globalStore = syncedStore({
  pjt: {} as ProjectInfo,
});
new WebrtcProvider('id', getYjsValue(globalStore) as any); // sync via webrtc
