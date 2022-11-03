import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';

export type ProjectInfo = {
  title: string;
  desc: string;
  startDay: string;
  endDay: string;
  gitLink: string;
  jiraLink: string;
  notionLink: string;
  figmaLink: string;
  members: User[];
};

export type User = {
  id: number;
  img: string;
  name: string;
};

export const globalStore = syncedStore({
  pjt: {} as ProjectInfo,
});
new WebrtcProvider('id', getYjsValue(globalStore) as any); // sync via webrtc
