import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import {
  Form,
  useActionData,
  useSubmit,
  useTransition
} from '@remix-run/react';
import { useEffect } from 'react';
import invariant from 'tiny-invariant';
import { useSessionStorage } from 'react-use';
import type { SubmitHandler } from 'react-hook-form';
import { useForm } from 'react-hook-form';
import { processContactRequest } from '~/contact.server';
import { mergeClasses } from '~/utils/merge-classes';

const emailRegex = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gim;
const phoneRegex =
  /^[\\+]?[(]?[0-9]{3}[)]?[-\s\\.]?[0-9]{3}[-\s\\.]?[0-9]{4,6}$/gim;

type ActionData =
  | {
      name: string | null;
      email: string | null;
      phone: string | null;
      message: string | null;
    }
  | undefined;

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  const errors: ActionData = {
    name: !name ? 'Name is required' : null,
    email: !email
      ? 'Email is required'
      : !emailRegex.test(String(email))
      ? 'Email is incorrect'
      : null,
    phone: !phone ? 'Phone is required' : null,
    message: !message ? 'Message is required' : null
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  // validate all form data values before submitting
  invariant(typeof name === 'string', 'Name is required');
  invariant(typeof email === 'string', 'Email is required');
  invariant(typeof phone === 'string', 'Phone is required');
  invariant(typeof message === 'string', 'Message is required');

  try {
    // now it's time to submit request
    await processContactRequest({
      name,
      email,
      phone,
      message
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      throw Error(err.message);
    }
    throw Error('Oops, something bad happened!');
  }

  // navigate to thank you page on successful contact submit
  return redirect('/contact/thank-you');
};

type FormInputs = {
  name: string;
  phone: string;
  email: string;
  message: string;
};

export default function ContactIndexRoute() {
  const serverErrors = useActionData<ActionData>();
  const inputClassName =
    'border border-slate-400 bg-white leading-none p-2 rounded-md w-full block focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-lime-500';
  const labelClassName = 'cursor-pointer font-semibold mb-1 inline-block';
  const errorClassName = 'font-semibold italic text-red-500 text-xs';
  const { state } = useTransition();
  const submit = useSubmit();
  const isSubmitting = state === 'submitting';
  const [persistFormData, setPersistFormData] = useSessionStorage(
    'contact-intent',
    {
      name: '',
      phone: '',
      email: '',
      message: ''
    },
    false
  );
  const {
    register,
    handleSubmit,
    watch,
    clearErrors,
    formState: { errors: clientErrors }
  } = useForm<FormInputs>({
    defaultValues: {
      name: persistFormData.name,
      phone: persistFormData.phone,
      email: persistFormData.email,
      message: persistFormData.message
    }
  });
  const clearFormDataInSession = () =>
    setPersistFormData({
      name: '',
      phone: '',
      email: '',
      message: ''
    });
  const onSubmit: SubmitHandler<FormInputs> = (data) => {
    submit(data, {
      method: 'post',
      replace: false
    });
    clearErrors();
    clearFormDataInSession();
  };

  useEffect(() => {
    const watchSubscribe = watch((value) => {
      setPersistFormData({
        name: value.name ?? '',
        phone: value.phone ?? '',
        email: value.email ?? '',
        message: value.message ?? ''
      });
    });
    return () => watchSubscribe.unsubscribe();
  }, [watch, setPersistFormData]);

  return (
    <Form
      method="post"
      name="contact"
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div className="relative">
          <label htmlFor="name" className={labelClassName}>
            Name:{' '}
            {serverErrors?.name ? (
              <span className={errorClassName}>{serverErrors.name}</span>
            ) : null}
            {clientErrors.name ? (
              <span className={errorClassName}>
                {clientErrors.name.message}
              </span>
            ) : null}
          </label>
          <input
            id="name"
            type="text"
            className={`${mergeClasses({
              [inputClassName]: true,
              'border-red-600': clientErrors?.name || serverErrors?.name
            })}`}
            {...register('name', {
              required: 'Name is required.'
            })}
            defaultValue={persistFormData.name}
          />
        </div>
        <div className="relative pb-2">
          <label htmlFor="phone" className={labelClassName}>
            Phone:{' '}
            {serverErrors?.phone ? (
              <span className={errorClassName}>{serverErrors.phone}</span>
            ) : null}
            {clientErrors?.phone ? (
              <span className={errorClassName}>
                {clientErrors.phone.type === 'validate'
                  ? 'Please enter valid phone'
                  : clientErrors.phone.message}
              </span>
            ) : null}
          </label>
          <input
            id="phone"
            type="text"
            className={`${mergeClasses({
              [inputClassName]: true,
              'border-red-600': clientErrors?.phone || serverErrors?.phone
            })}`}
            {...register('phone', {
              // validate: (value) => phoneRegex.test(value),
              pattern: {
                value: phoneRegex,
                message: 'Phone is invalid'
              },
              required: 'Phone is required'
            })}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className={labelClassName}>
          Email:{' '}
          {serverErrors?.email ? (
            <span className={errorClassName}>{serverErrors.email}</span>
          ) : null}
          {clientErrors?.email ? (
            <span className={errorClassName}>
              {clientErrors.email.type === 'validate'
                ? 'Please enter valid email'
                : clientErrors.email.message}
            </span>
          ) : null}
        </label>
        <input
          id="email"
          type="email"
          className={`${mergeClasses({
            [inputClassName]: true,
            'border-red-600': clientErrors?.email || serverErrors?.email
          })}`}
          {...register('email', {
            // validate: (value) => emailRegex.test(value),
            pattern: {
              value: emailRegex,
              message: 'Email is invalid'
            },
            required: 'Email is required'
          })}
        />
      </div>
      <div className="mb-8">
        <label htmlFor="message" className={labelClassName}>
          Message:{' '}
          {serverErrors?.message ? (
            <span className={errorClassName}>{serverErrors.message}</span>
          ) : null}
          {clientErrors?.message ? (
            <span className={errorClassName}>
              {clientErrors.message.message}
            </span>
          ) : null}
        </label>
        <textarea
          id="message"
          rows={5}
          className={`${mergeClasses({
            [inputClassName]: true,
            'border-red-600': clientErrors?.message || serverErrors?.message
          })}`}
          {...register('message', {
            required: 'Message is required',
            minLength: {
              value: 5,
              message: 'Please enter at least 5 characters'
            }
          })}
        />
      </div>
      <button
        type="submit"
        className="block w-full rounded-md border border-lime-600 bg-lime-600 p-2 text-lime-50 hover:border-lime-700  hover:bg-lime-700 disabled:opacity-50"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Submit'}
      </button>
    </Form>
  );
}
