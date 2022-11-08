export interface MEMBER {
  memberId: number;
  memberNickname: string;
  memberProfileImg: string;
}

export interface PROJECT_LIST {
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
