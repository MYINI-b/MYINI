import { createStore } from 'redux';
import { persistStore } from 'redux-persist';
import Reducers from './Reducers';

export const Store = createStore(Reducers);
export const Persistor = persistStore(Store);

export default { Store, Persistor };
