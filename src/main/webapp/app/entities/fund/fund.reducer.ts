import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IFund, defaultValue } from 'app/shared/model/fund.model';

export const ACTION_TYPES = {
  SEARCH_FUNDS: 'fund/SEARCH_FUNDS',
  FETCH_FUND_LIST: 'fund/FETCH_FUND_LIST',
  FETCH_FUND: 'fund/FETCH_FUND',
  CREATE_FUND: 'fund/CREATE_FUND',
  UPDATE_FUND: 'fund/UPDATE_FUND',
  DELETE_FUND: 'fund/DELETE_FUND',
  RESET: 'fund/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IFund>,
  entity: defaultValue,
  updating: false,
  updateSuccess: false,
};

export type FundState = Readonly<typeof initialState>;

// Reducer

export default (state: FundState = initialState, action): FundState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_FUNDS):
    case REQUEST(ACTION_TYPES.FETCH_FUND_LIST):
    case REQUEST(ACTION_TYPES.FETCH_FUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_FUND):
    case REQUEST(ACTION_TYPES.UPDATE_FUND):
    case REQUEST(ACTION_TYPES.DELETE_FUND):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_FUNDS):
    case FAILURE(ACTION_TYPES.FETCH_FUND_LIST):
    case FAILURE(ACTION_TYPES.FETCH_FUND):
    case FAILURE(ACTION_TYPES.CREATE_FUND):
    case FAILURE(ACTION_TYPES.UPDATE_FUND):
    case FAILURE(ACTION_TYPES.DELETE_FUND):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_FUNDS):
    case SUCCESS(ACTION_TYPES.FETCH_FUND_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_FUND):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_FUND):
    case SUCCESS(ACTION_TYPES.UPDATE_FUND):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_FUND):
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

const apiUrl = 'api/funds';
const apiSearchUrl = 'api/_search/funds';

// Actions

export const getSearchEntities: ICrudSearchAction<IFund> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_FUNDS,
  payload: axios.get<IFund>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IFund> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_FUND_LIST,
  payload: axios.get<IFund>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntity: ICrudGetAction<IFund> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_FUND,
    payload: axios.get<IFund>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IFund> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_FUND,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IFund> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_FUND,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IFund> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_FUND,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
