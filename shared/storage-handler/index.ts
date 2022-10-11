import Cookie from 'cookie';
import JsCookie from 'js-cookie';

const getCookieItem = (key: String) => JsCookie.get(key);

const parseCookies = (cookie: any) => {
  let parsedCookies = cookie;
  if (typeof parsedCookies !== 'string') {
    parsedCookies = '';
  }
  parsedCookies = Cookie.parse(parsedCookies);
  return parsedCookies;
};

export { getCookieItem, parseCookies };
