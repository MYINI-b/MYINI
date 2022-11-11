import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { combineReducers } from 'redux';

import member from './member';
import erd from './erd';
import vuerd from './vuerd';
import project from './Project';

const persistConfig = {
  key: 'root',
  storage,
};
export const rootReducer = combineReducers({
  member,
  erd,
  vuerd,
  project,
});

export default persistReducer(persistConfig, rootReducer);
