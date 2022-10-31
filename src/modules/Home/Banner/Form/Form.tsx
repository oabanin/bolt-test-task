import { FC, useCallback } from 'react';

import Checkbox from '../../../../components/Checkbox/Checkbox';
import Input from '../../../../components/Input/Input';
import Select from '../../../../components/Select/Select';
import { IValues, useForm } from '../../../../hooks/useForm';
import { regexEmail } from '../../../../utils/regex';
import './form.scss';

const emailHelperText = (
  <>
    <i className="bi bi-info-circle-fill mr-2" />
    This will be your username
  </>
);

const consentLabel = (
  <>
    I agree to Bolt's <a href="#">Terms of Service</a> and <a href="#">Privacy Policy</a>
  </>
);

const codes = [
  { label: '+372', value: '+372' },
  { label: '+1', value: '+1' },
  { label: '+96', value: '+96' },
  { label: '+23', value: '+23' },
  { label: '+123', value: '+123' },
  { label: '+234', value: '+234' },
  { label: '+345', value: '+345' },
  { label: '+456', value: '+456' },
  { label: '+567', value: '+567' },
  { label: '+678', value: '+678' },
  { label: '+789', value: '+789' },
  { label: '+989', value: '+989' },
  { label: '+188', value: '+188' },
  { label: '+512', value: '+512' },
  { label: '+846', value: '+846' },
  { label: '+858', value: '+858' },
  { label: '+286', value: '+286' },
  { label: '+974', value: '+974' },
  { label: '+666', value: '+666' },
  { label: '+636', value: '+636' },
];

const cities = [
  { label: 'Haapsalu', value: 'Haapsalu' },
  { label: 'Jõhvi', value: 'Jõhvi' },
  { label: 'Kiviõli', value: 'Kiviõli' },
  { label: 'Kohtla-Järve', value: 'Kohtla-Järve' },
  { label: 'Kuressaare', value: 'Kuressaare' },
  { label: 'Narva', value: 'Narva' },
  { label: 'Pärnu', value: 'Pärnu' },
  { label: 'Põltsamaa', value: 'Põltsamaa' },
  { label: 'Rakvere', value: 'Rakvere' },
  { label: 'Sillamäe', value: 'Sillamäe' },
  { label: 'Tallinn', value: 'Tallinn' },
  { label: 'Tartu', value: 'Tartu' },
  { label: 'Valga', value: 'Valga' },
  { label: 'Viljandi', value: 'Viljandi' },
  { label: 'Võru', value: 'Võru' },
];

const Form: FC = () => {
  const { values, errors, touched, handleBlur, handleSubmit, handleChange, setFieldValue } =
    useForm({
      initialValues: {
        email: '',
        code: '+372',
        phone: '',
        city: 'Tallinn',
        consent: false,
      },
      onSubmit: async (values: IValues) => {
        alert(JSON.stringify(values, null, 2));
      },
      validationSchema: {
        email: {
          required: {
            value: true,
          },
          pattern: {
            value: regexEmail,
            message: 'Please enter valid email',
          },
        },
        phone: {
          required: {
            value: true,
            message: 'Phone is required',
          },
          pattern: {
            value: /^[0-9]*$/,
          },
          custom: {
            isValid: (value) => value.length < 12,
            message: 'Max 11 characters',
          },
        },
        consent: {
          required: {
            value: true,
          },
        },
      },
    });

  const handleBlurMemoized = useCallback(handleBlur, []);
  const handleChangeMemoized = useCallback(handleChange, []);
  const setFieldValueMemoized = useCallback(
    (fieldName: string, value: string) => setFieldValue(fieldName, value),
    [],
  );

  return (
    <div className="card rounded-form-lg">
      <div className="card-body">
        <h4 className="card-title font-weight-bold">Become a Bolt driver</h4>
        <p className="card-text">
          If you have multiple cars or drives{' '}
          <a href="modules/Home/Banner/Form/Form#">sign up as a fleet owner.</a>
        </p>
        <form onSubmit={handleSubmit}>
          <Input
            inputMode="email"
            placeholder="Email"
            onBlur={handleBlurMemoized}
            onChange={handleChangeMemoized}
            value={values.email}
            label="Email address"
            name="email"
            helper={emailHelperText}
            error={touched.email && errors.email}
          />
          <div className="form-row align-items-end">
            <div className="col-4 text-nowrap">
              <Select
                name="code"
                value={values.code}
                label="Phone"
                error={touched.phone && errors.phone}
                options={codes}
                onChange={setFieldValueMemoized}
              />
            </div>
            <div className="col-8">
              <Input
                inputMode="tel"
                placeholder="Phone"
                onBlur={handleBlurMemoized}
                onChange={handleChangeMemoized}
                value={values.phone}
                name="phone"
                error={touched.phone && errors.phone && <>&nbsp;</>}
              />
            </div>
          </div>
          <div>
            <Select
              name="city"
              value={values.city}
              label="City"
              error={touched.city && errors.city}
              options={cities}
              onChange={setFieldValueMemoized}
            />
          </div>
          <Checkbox
            onChange={handleChangeMemoized}
            value={values.consent}
            name="consent"
            label={consentLabel}
            error={touched.consent && errors.consent}
          />
          <button type="submit" className="btn btn-lg text-uppercase btn-bolt px-4 w-100">
            Sign up as a driver
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
