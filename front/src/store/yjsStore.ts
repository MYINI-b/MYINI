import { getYjsValue, syncedStore } from '@syncedstore/core';
import { WebrtcProvider } from 'y-webrtc';
import { USER } from 'types/Setting';
import { ROW, CATEGORY } from 'types/Requirement';
import { CONTROLLER, API } from 'types/ApiSpec';

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
  categories: CATEGORY[];

  // controllers
  controllers: CONTROLLER[];
  currentAPI: API;

  // erd
  erdData: string;
};

export const globalStore = syncedStore({
  pjt: {} as ProjectInfo,
});
export const globalStore2 = syncedStore({
  pjt: {} as ProjectInfo,
});

// export const id = new WebrtcProvider('id', getYjsValue(globalStore) as any); // sync via webrtc
// export const id2 = new WebrtcProvider('id2', getYjsValue(globalStore2) as any); // sync via webrtc
