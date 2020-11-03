import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IUser, defaultValue } from 'app/shared/model/user.model';

export const ACTION_TYPES = {
  FETCH_ACCOUNT: 'account/FETCH_ACCOUNT',
  UPDATE_ACCOUNT: 'account/UPDATE_ACCOUNT',
  DELETE_ACCOUNT: 'account/DELETE_ACCOUNT',
  RESET: 'account/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type ProfileState = Readonly<typeof initialState>;

// Reducer

export default (state: ProfileState = initialState, action): ProfileState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_ACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.UPDATE_ACCOUNT):
    case REQUEST(ACTION_TYPES.DELETE_ACCOUNT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.FETCH_ACCOUNT):
    case FAILURE(ACTION_TYPES.UPDATE_ACCOUNT):
    case FAILURE(ACTION_TYPES.DELETE_ACCOUNT):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.FETCH_ACCOUNT):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.UPDATE_ACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_ACCOUNT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: {},
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/account';

// Actions

export const getEntity: ICrudGetAction<IUser> = id => {
  return {
    type: ACTION_TYPES.FETCH_ACCOUNT,
    payload: axios.get<IUser>(`api/users/${id}`),
  };
};

export const updateEntity: ICrudPutAction<IUser> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_ACCOUNT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IUser> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_ACCOUNT,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntity(id));
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
