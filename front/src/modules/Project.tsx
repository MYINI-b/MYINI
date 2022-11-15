/* eslint-disable default-param-last */
// 액션타입 선언
const SET_PID = 'SET_PID';
const SET_SESSIONS = 'SET_SESSIONS';
const ADD_SESSION = 'ADD_SESSION';
const SET_PROVIDER = 'SET_PROVIDER';

// 액션 생성함수를 선언
export const setPid = (pid: string) => ({
  type: SET_PID,
  payload: pid,
});

export const addSession = (key: string, session: any) => ({
  type: ADD_SESSION,
  payload: { key, session },
});

export const setSessions = (sessions: any) => ({
  type: SET_SESSIONS,
  payload: sessions,
});

export const setProvider = (provider: any) => ({
  type: SET_PROVIDER,
  payload: provider,
});

type ProjectAction =
  | ReturnType<typeof setPid>
  | ReturnType<typeof setSessions>
  | ReturnType<typeof addSession>
  | ReturnType<typeof setProvider>;

// 모듈 타입선언
type ProjectState = {
  pid: string;
  sessions: any;
  wsProvider: any;
};

// 초기상태선언
const initialState: ProjectState = {
  pid: '',
  sessions: {},
  wsProvider: {},
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
        [action.payload.key]: action.payload.session,
      };
      console.log(copySession);
      return {
        ...state,
        sessions: { ...copySession },
      };
    case SET_PROVIDER:
      return {
        ...state,
        wsProvider: action.payload,
      };
    default:
      return state;
  }
}

export default project;
