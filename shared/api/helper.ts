import { getCookieItem } from '../storage-handler';

const createQueryString = (obj: any = {}) => {
  if (!obj) {
    return '';
  }
  const esc = encodeURIComponent;
  return Object.keys(obj)
    .map((k) => `${esc(k)}=${esc(obj[k])}`)
    .join('&');
};

const createHeaders = (isMultiPart: Boolean, token: String) => {
  const cookieToken = token || getCookieItem('token');
  const headers = new Headers();
  headers.set('Pragma', 'no-cache');
  headers.set('Cache-Control', 'no-cache');
  headers.set('Accept', 'application/json');
  if (!isMultiPart) {
    headers.set('Content-Type', 'application/json');
  }
  if (cookieToken) {
    headers.set('Authorization', `Bearer ${cookieToken}`);
  }
  return new Headers(headers);
};

const fetchHandler = async (res: any) => {
  const content = res.headers.get('content-disposition');
  if (content) return res;
  if (res.ok) {
    return res.json();
  }
  if (res.status !== 200) {
    return Promise.reject(res);
  }
  return Promise.reject(res);
};

const checkSuccess = (res: any) => {
  const content = res.headers && res.headers.get('content-disposition');
  if (content) return res;
  if (res.success) {
    return res;
  }
  return Promise.reject(res);
};

const fetchErrorHandler = (res: any) => Promise.reject(res);

export {
  createQueryString,
  createHeaders,
  fetchHandler,
  checkSuccess,
  fetchErrorHandler,
};
