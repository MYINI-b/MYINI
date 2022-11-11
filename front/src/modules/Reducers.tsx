import { combineReducers } from 'redux';
import member from './member';
import erd from './erd';
import vuerd from './vuerd';
import project from './Project';

const rootReducer = combineReducers({
  member,
  erd,
  vuerd,
  project,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
