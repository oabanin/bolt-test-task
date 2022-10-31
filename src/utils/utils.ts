import { IValues } from '../hooks/useForm';

export function setTouchedAll(object: IValues, value: boolean) {
  const response: {
    [index: string]: boolean;
  } = {};
  for (const k of Object.keys(object)) {
    response[k] = value;
  }
  return response;
}
