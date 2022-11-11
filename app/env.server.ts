import invariant from 'tiny-invariant';

export function getEnv() {
  invariant(process.env.CONTACT_EMAIL, 'No CONTACT_EMAIL set in .env');
  invariant(process.env.CONTACT_PHONE, 'No CONTACT_PHONE set in .env');

  return {
    CONTACT_EMAIL: process.env.CONTACT_EMAIL,
    CONTACT_PHONE: process.env.CONTACT_PHONE
  };
}
