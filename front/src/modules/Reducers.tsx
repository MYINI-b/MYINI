import { combineReducers } from 'redux';
import member from './member';
import erd from './erd';
import vuerd from './vuerd';

const rootReducer = combineReducers({
  member,
  erd,
  vuerd,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
