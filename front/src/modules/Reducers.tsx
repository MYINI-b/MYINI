import { combineReducers } from 'redux';
import member from './member';
import erd from './erd';
import vuerd from './vuerd';
import project from './project';
import crew from './crew';

const rootReducer = combineReducers({
  member,
  erd,
  vuerd,
  project,
  crew,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
