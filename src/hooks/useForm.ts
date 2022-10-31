import { ChangeEvent, FocusEvent, FormEvent, useEffect, useReducer } from 'react';

import { capitalize } from '../utils/capitalize';
import { setTouchedAll } from '../utils/utils';

export interface IValues {
  [index: string]: string | boolean;
}

interface IUseForm {
  initialValues: IValues;
  onSubmit(values: IValues): void;
  validationSchema: Validations<IValues>;
}

interface Validation {
  required?: {
    value: boolean;
    message?: string;
  };
  pattern?: {
    value: RegExp;
    message?: string;
  };
  custom?: {
    isValid: (value: string) => boolean;
    message?: string;
  };
}

type Validations<T extends Record<string, unknown>> = Partial<Record<keyof T, Validation>>;
type ErrorRecord<T> = Partial<Record<keyof T, string>>;

interface IState {
  values: IValues;
  errors: {
    [index: string]: string;
  };
  touched: {
    [index: string]: boolean;
  };
  isSubmitting: boolean;
}

enum ActionType {
  SET_ERRORS = 'SET_ERRORS',
  SET_FIELD_VALUE = 'SET_FIELD_VALUE',
  SET_FIELD_TOUCHED = 'SET_FIELD_TOUCHED',
  SUBMIT_ATTEMPT = 'SUBMIT_ATTEMPT',
  SUBMIT_SUCCESS = 'SUBMIT_SUCCESS',
  SUBMIT_FAILURE = 'SUBMIT_FAILURE',
}

interface Action {
  type: ActionType;
  payload?: any;
}

function reducer(state: IState, action: Action) {
  switch (action.type) {
    case ActionType.SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case ActionType.SET_FIELD_VALUE:
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      };
    case ActionType.SET_FIELD_TOUCHED:
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      };
    case ActionType.SUBMIT_ATTEMPT:
      return {
        ...state,
        isSubmitting: true,
        touched: setTouchedAll(state.values, true),
      };
    case ActionType.SUBMIT_SUCCESS:
      return {
        ...state,
        isSubmitting: false,
      };
    case ActionType.SUBMIT_FAILURE:
      return {
        ...state,
        isSubmitting: false,
        submitError: action.payload,
      };
    default:
      return state;
  }
}

function validate(values: IValues, validationSchema: Validations<IValues>) {
  const errors: ErrorRecord<IValues> = {};
  for (const key in validationSchema) {
    const value = values[key];
    const validation = validationSchema[key];
    if (validation?.required?.value && !value) {
      errors[key] = validation.required.message || `${capitalize(key)} is required`;
    }

    const pattern = validation?.pattern;
    if (pattern?.value && typeof value === 'string' && !pattern.value.test(value)) {
      errors[key] = pattern.message || `${capitalize(key)} is invalid`;
    }

    const custom = validation?.custom;
    if (custom?.isValid && typeof value === 'string' && !custom.isValid(value)) {
      errors[key] = custom.message;
    }
  }
  return errors;
}

export function useForm(props: IUseForm) {
  const [state, dispatch] = useReducer(reducer, {
    values: props.initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  });

  useEffect(() => {
    const errors = validate(state.values, props.validationSchema);
    dispatch({ type: ActionType.SET_ERRORS, payload: errors });
  }, [state.values]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SET_FIELD_VALUE,
      payload: {
        [event.target.name]:
          event.target.type === 'checkbox' ? event.target.checked : event.target.value,
      },
    });
  };

  const setFieldValue = (fieldName: string, value: string | boolean) => {
    dispatch({
      type: ActionType.SET_FIELD_VALUE,
      payload: {
        [fieldName]: value,
      },
    });
  };

  const handleBlur = (event: FocusEvent<HTMLInputElement>) => {
    dispatch({
      type: ActionType.SET_FIELD_TOUCHED,
      payload: { [event.target.name]: true },
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch({ type: ActionType.SUBMIT_ATTEMPT });
    const errors = validate(state.values, props.validationSchema);
    if (!Object.keys(errors).length) {
      try {
        await props.onSubmit(state.values);
        dispatch({ type: ActionType.SUBMIT_SUCCESS });
      } catch (submitError) {
        dispatch({ type: ActionType.SUBMIT_FAILURE, payload: submitError });
      }
    } else {
      dispatch({ type: ActionType.SET_ERRORS, payload: errors });
      dispatch({ type: ActionType.SUBMIT_FAILURE });
    }
  };

  return { handleChange, handleBlur, handleSubmit, setFieldValue, ...state };
}
