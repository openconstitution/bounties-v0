import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IBounty, defaultValue } from 'app/shared/model/bounty.model';

export const ACTION_TYPES = {
  SEARCH_BOUNTIES: 'bounty/SEARCH_BOUNTIES',
  FETCH_BOUNTY_LIST: 'bounty/FETCH_BOUNTY_LIST',
  FETCH_BOUNTY_LIST_PER_PAGE: 'bounty/FETCH_BOUNTY_LIST_PER_PAGE',
  FETCH_BOUNTY: 'bounty/FETCH_BOUNTY',
  CREATE_BOUNTY: 'bounty/CREATE_BOUNTY',
  UPDATE_BOUNTY: 'bounty/UPDATE_BOUNTY',
  DELETE_BOUNTY: 'bounty/DELETE_BOUNTY',
  RESET: 'bounty/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  entities: [] as ReadonlyArray<IBounty>,
  entity: defaultValue,
  links: { next: 0 },
  updating: false,
  totalItems: 0,
  updateSuccess: false,
};

export type BountyState = Readonly<typeof initialState>;

// Reducer

export default (state: BountyState = initialState, action): BountyState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.SEARCH_BOUNTIES):
    case REQUEST(ACTION_TYPES.FETCH_BOUNTY_LIST):
      case REQUEST(ACTION_TYPES.FETCH_BOUNTY_LIST_PER_PAGE):
    case REQUEST(ACTION_TYPES.FETCH_BOUNTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_BOUNTY):
    case REQUEST(ACTION_TYPES.UPDATE_BOUNTY):
    case REQUEST(ACTION_TYPES.DELETE_BOUNTY):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        updating: true,
      };
    case FAILURE(ACTION_TYPES.SEARCH_BOUNTIES):
    case FAILURE(ACTION_TYPES.FETCH_BOUNTY_LIST):
      case FAILURE(ACTION_TYPES.FETCH_BOUNTY_LIST_PER_PAGE):
    case FAILURE(ACTION_TYPES.FETCH_BOUNTY):
    case FAILURE(ACTION_TYPES.CREATE_BOUNTY):
    case FAILURE(ACTION_TYPES.UPDATE_BOUNTY):
    case FAILURE(ACTION_TYPES.DELETE_BOUNTY):
      return {
        ...state,
        loading: false,
        updating: false,
        updateSuccess: false,
        errorMessage: action.payload,
      };
    case SUCCESS(ACTION_TYPES.SEARCH_BOUNTIES):
    case SUCCESS(ACTION_TYPES.FETCH_BOUNTY_LIST):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOUNTY_LIST_PER_PAGE):
      return {
        ...state,
        loading: false,
        entities: action.payload.data,
        totalItems: parseInt(action.payload.headers['x-total-count'], 10),
      };
    case SUCCESS(ACTION_TYPES.FETCH_BOUNTY):
      return {
        ...state,
        loading: false,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_BOUNTY):
    case SUCCESS(ACTION_TYPES.UPDATE_BOUNTY):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        entity: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.DELETE_BOUNTY):
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

export const getSearchEntities: ICrudSearchAction<IBounty> = (query, page, size, sort) => ({
  type: ACTION_TYPES.SEARCH_BOUNTIES,
  payload: axios.get<IBounty>(`${apiSearchUrl}?query=${query}`),
});

export const getEntities: ICrudGetAllAction<IBounty> = (page, size, sort) => ({
  type: ACTION_TYPES.FETCH_BOUNTY_LIST,
  payload: axios.get<IBounty>(`${apiUrl}?cacheBuster=${new Date().getTime()}`),
});

export const getEntitiesPerPage: ICrudGetAllAction<IBounty> = (page, size, sort) => {
  const requestUrl = `${apiUrl}${sort ? `?page=${page}&size=${size}&sort=${sort}` : ''}`;
  return {
    type: ACTION_TYPES.FETCH_BOUNTY_LIST_PER_PAGE,
    payload: axios.get<IBounty>(`${requestUrl}${sort ? '&' : '?'}cacheBuster=${new Date().getTime()}`),
  };
};


export const getEntity: ICrudGetAction<IBounty> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_BOUNTY,
    payload: axios.get<IBounty>(requestUrl),
  };
};

export const createEntity: ICrudPutAction<IBounty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_BOUNTY,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getEntities());
  return result;
};

export const updateEntity: ICrudPutAction<IBounty> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_BOUNTY,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const deleteEntity: ICrudDeleteAction<IBounty> = id => async dispatch => {
  const requestUrl = `${apiUrl}/${id}`;
  const result = await dispatch({
    type: ACTION_TYPES.DELETE_BOUNTY,
    payload: axios.delete(requestUrl),
  });
  dispatch(getEntities());
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
