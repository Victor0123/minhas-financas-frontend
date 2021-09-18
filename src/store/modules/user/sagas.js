import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import api from '../../../services/api';

import { updateProfileSuccesess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, phone_number, ...rest } = payload.data;

    const profile = {
      name,
      email,
      phone: phone_number,
      ...(rest.oldPassword ? rest : {}),
    };

    const response = yield call(api.put, 'users', profile);

    toast.success('Perfil atualizado');

    yield put(updateProfileSuccesess(response.data));
  } catch (err) {
    toast.error('Erro ao atualizar perfil, confira seus dados!');
    yield put(updateProfileFailure());
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
