import { combineReducers } from 'redux';
import tokenReducer from './Auth';

const rootReducer = combineReducers({
  tokenReducer,
});

export default rootReducer;
