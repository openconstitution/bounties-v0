import axios from 'axios';
import { ICrudSearchAction, ICrudGetAction, ICrudGetAllAction, ICrudPutAction, ICrudDeleteAction } from 'react-jhipster';

import { cleanEntity } from 'app/shared/util/entity-utils';
import { REQUEST, SUCCESS, FAILURE } from 'app/shared/reducers/action-type.util';

import { IStripeConfig, IPaymentIntent, defaultConfig, defaultPaymentIntent } from 'app/shared/model/stripe-payment.model';

export const ACTION_TYPES = {
  FETCH_CONFIG: 'stripe-payment/FETCH_CONFIG',
  FETCH_PAYMENT_INTENT: 'stripe-payment/FETCH_PAYMENT_INTENT',
  CREATE_PAYMENT_INTENT: 'stripe-payment/CREATE_PAYMENT_INTENT',
  UPDATE_PAYMENT_INTENT: 'stripe-payment/UPDATE_PAYMENT_INTENT',
  RESET: 'stripe-payment/RESET',
};

const initialState = {
  loading: false,
  errorMessage: null,
  config: defaultConfig,
  paymentIntent: defaultPaymentIntent,
  updating: false,
  updateSuccess: false,
};

export type StripePaymentState = Readonly<typeof initialState>;

// Reducer

export default (state: StripePaymentState = initialState, action): StripePaymentState => {
  switch (action.type) {
    case REQUEST(ACTION_TYPES.FETCH_CONFIG):
    case REQUEST(ACTION_TYPES.FETCH_PAYMENT_INTENT):
      return {
        ...state,
        errorMessage: null,
        updateSuccess: false,
        loading: true,
      };
    case REQUEST(ACTION_TYPES.CREATE_PAYMENT_INTENT):
    case REQUEST(ACTION_TYPES.UPDATE_PAYMENT_INTENT):
    case FAILURE(ACTION_TYPES.FETCH_CONFIG):
    case FAILURE(ACTION_TYPES.FETCH_PAYMENT_INTENT):
    case FAILURE(ACTION_TYPES.CREATE_PAYMENT_INTENT):
    case FAILURE(ACTION_TYPES.UPDATE_PAYMENT_INTENT):
    case SUCCESS(ACTION_TYPES.FETCH_CONFIG):
      return {
        ...state,
        loading: false,
        config: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.FETCH_PAYMENT_INTENT):
      return {
        ...state,
        loading: false,
        paymentIntent: action.payload.data,
      };
    case SUCCESS(ACTION_TYPES.CREATE_PAYMENT_INTENT):
    case SUCCESS(ACTION_TYPES.UPDATE_PAYMENT_INTENT):
      return {
        ...state,
        updating: false,
        updateSuccess: true,
        paymentIntent: action.payload.data,
      };
    case ACTION_TYPES.RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};

const apiUrl = 'api/stripe/config';
const apiConfigUrl = 'api/stripe/payment-intents';

// Actions

export const getConfig: ICrudGetAction<IStripeConfig> = () => {
  return {
    type: ACTION_TYPES.FETCH_CONFIG,
    payload: axios.get<IStripeConfig>(apiConfigUrl),
  };
};

export const getPaymentIntent: ICrudGetAction<IPaymentIntent> = id => {
  const requestUrl = `${apiUrl}/${id}`;
  return {
    type: ACTION_TYPES.FETCH_PAYMENT_INTENT,
    payload: axios.get<IPaymentIntent>(requestUrl),
  };
};

export const createPaymentIntent: ICrudPutAction<IPaymentIntent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.CREATE_PAYMENT_INTENT,
    payload: axios.post(apiUrl, cleanEntity(entity)),
  });
  dispatch(getPaymentIntent(entity.id));
  return result;
};

export const updatePaymentIntent: ICrudPutAction<IPaymentIntent> = entity => async dispatch => {
  const result = await dispatch({
    type: ACTION_TYPES.UPDATE_PAYMENT_INTENT,
    payload: axios.put(apiUrl, cleanEntity(entity)),
  });
  return result;
};

export const reset = () => ({
  type: ACTION_TYPES.RESET,
});
