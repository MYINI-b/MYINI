export interface USER {
  id: number;
  img: string;
  name: string;
  email: string;
  nickname?: string;
}

export interface JIRA {
  jiraProjectId: string;
  jiraProjectKey: string;
  jiraProjectName: string;
}
