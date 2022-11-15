/* eslint-disable default-param-last */
// 액션타입 선언
const GET_PROFILE = 'member/GET_PROFILE' as const;

// 액션 생성함수를 선언
export const Profile = (
  memberEmail: string,
  memberId: number,
  memberNickname: string,
  memberProfileImg: string,
  projectCount: number,
  memberJiraEmail: string,
) => ({
  type: GET_PROFILE,
  payload: {
    memberEmail,
    memberId,
    memberNickname,
    memberProfileImg,
    projectCount,
    memberJiraEmail,
  },
});

type ProfileAction = ReturnType<typeof Profile>;

// 모듈 타입선언
type ProfileState = {
  memberEmail: string;
  memberId: number;
  memberNickname: string;
  memberProfileImg: string;
  projectCount: number;
  memberJiraEmail: string;
};

// 초기상태선언
const initialState: ProfileState = {
  memberEmail: '',
  memberId: -1,
  memberNickname: '',
  memberProfileImg: '',
  projectCount: 0,
  memberJiraEmail: '',
};

// 리듀서 작성
function getProfile(
  state: ProfileState = initialState,
  action: ProfileAction,
): ProfileState {
  switch (action.type) {
    case GET_PROFILE:
      return {
        memberEmail: action.payload.memberEmail,
        memberId: action.payload.memberId,
        memberNickname: action.payload.memberNickname,
        memberProfileImg: action.payload.memberProfileImg,
        projectCount: action.payload.projectCount,
        memberJiraEmail: action.payload.memberJiraEmail,
      };
    default:
      return state;
  }
}

export default getProfile;
