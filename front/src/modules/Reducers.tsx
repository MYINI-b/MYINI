import { combineReducers } from 'redux';
import member from './member';
import erd from './erd';
import vuerd from './vuerd';
import project from './project';
import build from './build';

const rootReducer = combineReducers({
  member,
  erd,
  vuerd,
  project,
  build,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
