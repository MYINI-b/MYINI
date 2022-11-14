export interface MEMBER {
  memberId: number;
  memberNickname: string;
  memberProfileImg: string;
}

export interface PROJECT_LIST {
  projectId: number;
  projectName: string;
  projectDescription: string;
  projectImg: string;
  projectMemberResponse?: Array<MEMBER>;
}

export interface MY_INFO {
  memberEmail: string;
  memberId: number;
  memberNickname: string;
  memberProfileImg: string;
  projectCount: number;
}

export interface UserPresence {
  cursor?: {
    x: number;
    y: number;
  };
  name: string;
  color: string;
}
