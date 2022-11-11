import { combineReducers } from 'redux';
import auth from './Auth';
import member from './member';
import project from './Project';

const rootReducer = combineReducers({
  auth,
  member,
  project,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
