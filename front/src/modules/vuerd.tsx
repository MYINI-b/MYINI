/* eslint-disable default-param-last */
const CURRENT_ERD = 'vuerd/CURRENT_ERD' as const;

export const assignCurrentErd = (editor: string) => ({
  type: CURRENT_ERD,
  payload: {
    editor,
  },
});

type CurrentErdAction = ReturnType<typeof assignCurrentErd>;

type CurrentErdState = {
  editor: any;
};

const initialState: CurrentErdState = {
  editor: {},
};

// 리듀서 작성
function VuerdDataReducer(
  state: CurrentErdState = initialState,
  action: CurrentErdAction,
): CurrentErdState {
  switch (action.type) {
    case CURRENT_ERD:
      return {
        editor: { ...state, ...action.payload },
      };
    default:
      return state;
  }
}

export default VuerdDataReducer;
