/* eslint-disable default-param-last */
// 액션타입 선언
const SET_TOKEN = 'Auth/SET_TOKEN' as const;

// 액션 생성함수를 선언
export const setToken = (token: string) => ({
  type: SET_TOKEN,

  payload: token,
});

type AuthAction = ReturnType<typeof setToken>;

// 모듈 타입선언
type AuthState = {
  authenticated: boolean;
  accessToken: any;
};

// 초기상태선언
const initialState: AuthState = {
  authenticated: false,
  accessToken: null,
};

// 리듀서 작성
function getToken(
  state: AuthState = initialState,
  action: AuthAction,
): AuthState {
  switch (action.type) {
    case SET_TOKEN:
      return {
        authenticated: true,
        accessToken: action.payload,
      };
    default:
      return state;
  }
}

export default getToken;
