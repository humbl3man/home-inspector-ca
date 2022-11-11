import { encode } from './utils/encode';

type ContactData = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export async function processContactRequest(
  contactData: ContactData,
  formName: string,
  requestURL?: string
) {
  return fetch(`${process.env.URL || requestURL}/form`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: encode({ 'form-name': formName, ...contactData })
  });
}
