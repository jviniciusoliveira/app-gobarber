import {persistStore} from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducers';
import rootSagas from './modules/rootSagas';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({sagaMonitor});

const middlware = [sagaMiddleware];

const store = createStore(persistReducers(rootReducer), middlware);
const persistor = persistStore(store);

sagaMiddleware.run(rootSagas);

export {store, persistor};
