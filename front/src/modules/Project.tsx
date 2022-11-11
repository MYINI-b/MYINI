/* eslint-disable default-param-last */
// 액션타입 선언
const SET_PID = 'SET_PID';

// 액션 생성함수를 선언
export const setPid = (pid: string) => ({
  type: SET_PID,
  payload: pid,
});

type ProjectAction = ReturnType<typeof setPid>;

// 모듈 타입선언
type ProjectState = {
  pid: string;
};

// 초기상태선언
const initialState: ProjectState = {
  pid: '',
};

// 리듀서 작성
function project(
  state: ProjectState = initialState,
  action: ProjectAction,
): ProjectState {
  switch (action.type) {
    case SET_PID:
      return {
        ...state,
        pid: action.payload,
      };
    default:
      return state;
  }
}

export default project;
