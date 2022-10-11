import { get } from 'lodash';
import { parseCookies } from '../storage-handler';

export const fetchUrl = () => {
  const apiPath = '/api/v1';
  return `${process.env.NEXT_PUBLIC_APP_HOST_NAME}${apiPath}`;
};

export const fetchUrlFromCookie = (context: any) => {
  const {
    req: {
      headers: { cookie },
    },
  } = context;
  const cookieObj = parseCookies(cookie);
  const apiPath = '/api/v1';
  const url = `${process.env.NEXT_PUBLIC_APP_HOST_NAME}${apiPath}`;
  return {
    url,
    token: get(cookieObj, 'token'),
  };
};
