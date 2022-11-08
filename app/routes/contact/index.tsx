import type { ActionFunction } from '@remix-run/node';
import { redirect } from '@remix-run/node';
import { json } from '@remix-run/node';
import { Form, useActionData } from '@remix-run/react';
import { useState } from 'react';
import invariant from 'tiny-invariant';

const phoneRegex = /^\(?([0-9]{3})\)?[-.●\s]?([0-9]{3})[-.●\s]?([0-9]{4})$/gi;
const encode = (data: { [x: string]: string | number | boolean }) =>
  Object.keys(data)
    .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`)
    .join('&');

type ActionData =
  | {
      name: string | null;
      email: string | null;
      phone: string | null;
      message?: string | null;
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
    email: !email ? 'Email is required' : null,
    phone: !phone ? 'Phone is required' : null
  };

  const hasErrors = Object.values(errors).some((errorMessage) => errorMessage);

  if (hasErrors) {
    return json<ActionData>(errors);
  }

  // TODO: backend to actually submit form data

  invariant(typeof name === 'string', 'Name is required');
  invariant(typeof email === 'string', 'Email is required');
  invariant(typeof phone === 'string', 'Phone is required');
  invariant(typeof message === 'string', 'Message submitted incorrectly');
  // for now, redirect to thank you page

  const contactData = {
    name,
    email,
    phone,
    message
  };
  const response = await fetch(`${request.url}/form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encode({ 'form-name': 'contact', ...contactData })
  });

  // const submitRequest = await processContactRequest({
  //   name,
  //   email,
  //   phone,
  //   message
  // });
  return redirect('/contact/thank-you');
};

export default function ContactIndexRoute() {
  const errors = useActionData<ActionData>();
  const [phone, setPhone] = useState('');
  const inputClassName =
    'border border-slate-400 bg-white leading-none p-2 rounded-md w-full block focus:outline focus:outline-2 focus:outline-offset-1 focus:outline-lime-500';
  const labelClassName = 'cursor-pointer font-semibold mb-1 inline-block';
  const errorClassName = 'font-normal text-sm italic text-red-500';

  return (
    <Form method="post" name="contact">
      <div className="mb-4 grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className={labelClassName}>
            Name:{' '}
            {errors?.name ? (
              <span className={errorClassName}>Name is Required</span>
            ) : null}
          </label>
          <input
            id="name"
            type="text"
            name="name"
            className={inputClassName}
            required
          />
        </div>
        <div>
          <label htmlFor="phone" className={labelClassName}>
            Phone:{' '}
            {errors?.phone ? (
              <span className={errorClassName}>Phone is Required</span>
            ) : null}
          </label>
          <input
            id="phone"
            type="phone"
            name="phone"
            className={inputClassName}
            required
            onChange={(e) => {
              setPhone(e.target.value.trim());
            }}
            onBlur={(e) => {
              setPhone(e.target.value.trim().replace(phoneRegex, '($1) $2-$3'));
            }}
            value={phone}
          />
        </div>
      </div>
      <div className="mb-4">
        <label htmlFor="email" className={labelClassName}>
          Email:{' '}
          {errors?.email ? (
            <span className={errorClassName}>Email is Required</span>
          ) : null}
        </label>
        <input
          id="email"
          type="email"
          name="email"
          required
          className={inputClassName}
        />
      </div>
      <div className="mb-8">
        <label htmlFor="message" className={labelClassName}>
          Message:
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          className={inputClassName}
        />
      </div>
      <button
        type="submit"
        className="block w-full rounded-md border border-lime-600 bg-lime-600 p-2 text-lime-50 hover:border-lime-700  hover:bg-lime-700"
      >
        Submit
      </button>
    </Form>
  );
}
