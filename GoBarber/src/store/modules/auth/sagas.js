import {Alert} from 'react-native';
import {takeLatest, all, call, put} from 'redux-saga/effects';
import api from '~/services/api';

import {signInSuccess, signFailure} from './actions';

export function* signIn({payload}) {
  try {
    const {email, password} = payload;

    const response = yield call(api.post, 'sessions', {email, password});
    const {token, user} = response.data;

    if (user.provider) {
      Alert.alert(
        'Erro no login',
        'Prestadores devem acessar a aplicação Web.',
      );
    }

    api.defaults.headers.Authorization = `Baerer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (error) {
    Alert.alert(
      'Erro no login',
      'Falha no login. Verifique seus dados e tente novamente.',
    );
    yield put(signFailure());
  }
}

export function* signUp({payload}) {
  try {
    const {name, email, password} = payload;

    yield call(api.post, 'users', {name, email, password});

    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso.');
  } catch (error) {
    Alert.alert('Falha no cadastro', 'Falha ao cadastrar. Tente novamente.');

    yield put(signFailure());
  }
}

export function rehydrate({payload}) {
  if (!payload) return;

  const {token} = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Baerer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', rehydrate),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
