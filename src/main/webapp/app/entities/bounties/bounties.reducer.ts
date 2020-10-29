import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBounties, defaultValue } from 'app/shared/model/bounties.model';

export const ACTION_TYPES = {
  SEARCH_BOUNTIES: 'bounties/SEARCH_BOUNTIES',
  FETCH_BOUNTIES_LIST: 'bounties/FETCH_BOUNTIES_LIST',
  FETCH_BOUNTIES: 'bounties/FETCH_BOUNTIES',
  CREATE_BOUNTIES: 'bounties/CREATE_BOUNTIES',
  UPDATE_BOUNTIES: 'bounties/UPDATE_BOUNTIES',
  DELETE_BOUNTIES: 'bounties/DELETE_BOUNTIES',
  RESET: 'bounties/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBounties>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type BountiesState = Readonly<typeof initialState>;

// Reducer

export default (state: BountiesState = initialState, action): BountiesState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BOUNTIES):
    case REQUEST(ACTION_TYPES.FETCH_BOUNTIES_LIST):
    case REQUEST(ACTION_TYPES.FETCH_BOUNTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOUNTIES):
    case REQUEST(ACTION_TYPES.UPDATE_BOUNTIES):
    case REQUEST(ACTION_TYPES.DELETE_BOUNTIES):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_BOUNTIES):
    case FAILURE(ACTION_TYPES.FETCH_BOUNTIES_LIST):
    case FAILURE(ACTION_TYPES.FETCH_BOUNTIES):
    case FAILURE(ACTION_TYPES.CREATE_BOUNTIES):
    case FAILURE(ACTION_TYPES.UPDATE_BOUNTIES):
    case FAILURE(ACTION_TYPES.DELETE_BOUNTIES):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BOUNTIES):
    case SUCCESS(ACTION_TYPES.FETCH_BOUNTIES_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOUNTIES):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOUNTIES):
    case SUCCESS(ACTION_TYPES.UPDATE_BOUNTIES):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOUNTIES):
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

const apiUrl = 'api/bounties';
const apiSearchUrl = 'api/_search/bounties';

// Actions

export const getSearchEntities: ICrudSearchAction<IBounties> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_BOUNTIES,
  payload: axios.get<IBounties>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IBounties> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOUNTIES_LIST,
  payload: axios.get<IBounties>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IBounties> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOUNTIES,
    payload: axios.get<IBounties>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBounties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOUNTIES,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBounties> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOUNTIES,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBounties> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOUNTIES,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
