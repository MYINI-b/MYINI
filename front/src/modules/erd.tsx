/* eslint-disable default-param-last */
const GET_ERD = 'erd/GET_ERD' as const;

export const ERD = (editor: object) => ({
  type: GET_ERD,
  payload: {
    editor,
  },
});

type ERDAction = ReturnType<typeof ERD>;

type ERDState = {
  editor: any;
};

const initialState: ERDState = {
  editor: [],
};

// 리듀서 작성
function getERD(state: ERDState = initialState, action: ERDAction): ERDState {
  switch (action.type) {
    case GET_ERD:
      return {
        editor: action.payload.editor,
      };
    default:
      return state;
  }
}

export default getERD;
