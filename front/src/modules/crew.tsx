/* eslint-disable default-param-last */
// 액션타입 선언
const GET_CREW_ONLY_FOUR = 'GET_CREW_ONLY_FOUR' as const;

// 액션 생성함수를 선언
export const CrewOnlyFour = (crewData: object) => ({
  type: GET_CREW_ONLY_FOUR,
  payload: { crewData },
});

type CrewAction = ReturnType<typeof CrewOnlyFour>;

// 모듈 타입선언
type CrewState = {
  crewData: any;
};

// 초기상태선언
const initialState: CrewState = {
  crewData: [],
};

// 리듀서 작성
function getCrewOnlyFour(
  state: CrewState = initialState,
  action: CrewAction,
): CrewState {
  switch (action.type) {
    case GET_CREW_ONLY_FOUR:
      return { crewData: action.payload.crewData };
    default:
      return state;
  }
}

export default getCrewOnlyFour;
