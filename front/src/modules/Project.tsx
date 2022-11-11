/* eslint-disable default-param-last */
// 액션타입 선언
const SET_PID = 'SET_PID';
const SET_SESSIONS = 'SET_SESSIONS';
const ADD_SESSION = 'ADD_SESSIONS';

// 액션 생성함수를 선언
export const setPid = (pid: string) => ({
  type: SET_PID,
  payload: pid,
});

export const addSession = (session: any) => ({
  type: ADD_SESSION,
  payload: session,
});

export const setSessions = (sessions: any) => ({
  type: SET_SESSIONS,
  payload: sessions,
});

type ProjectAction =
  | ReturnType<typeof setPid>
  | ReturnType<typeof setSessions>
  | ReturnType<typeof addSession>;

// 모듈 타입선언
type ProjectState = {
  pid: string;
  sessions: any;
};

// 초기상태선언
const initialState: ProjectState = {
  pid: '',
  sessions: {},
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
        pid: typeof action.payload === 'string' ? action.payload : '',
      };
    case SET_SESSIONS:
      return {
        ...state,
        sessions: typeof action.payload === 'string' ? {} : action.payload,
      };
    case ADD_SESSION:
      const copySession = {
        ...state.sessions,
        [action.payload.key]: action.payload.value,
      };
      console.log(copySession);
      return {
        ...state,
        sessions: { ...copySession },
      };
    default:
      return state;
  }
}

export default project;
