import { get, isEmpty, isNull, isUndefined } from 'lodash';
import { safeJSONStringify } from '../formatting';
import { fetchUrl, fetchUrlFromCookie } from './env';
import {
  checkSuccess,
  createHeaders,
  createQueryString,
  fetchErrorHandler,
  fetchHandler,
} from './helper';

export class Http {
  createOptions = (url: String, options: any, isMultiPart: Boolean = false) => {
    options.headers = createHeaders(isMultiPart, get(options, 'token', null));
    return options;
  };

  get(url: String, queryParams: any = null, options: any = {}) {
    let qs;
    let newUrl;
    if (queryParams) {
      qs = createQueryString(queryParams);
      newUrl = `${fetchUrl()}/${url}?${qs}`;
    } else {
      newUrl = `${fetchUrl()}/${url}`;
    }
    const getOptions = { method: 'GET' };
    options = { ...options, ...getOptions };
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(newUrl, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  post(url: String, body: any, options: any = {}) {
    const postOptions = { method: 'POST', body: safeJSONStringify(body) };
    options = { ...options, ...postOptions };
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${fetchUrl()}/${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  put(url: String, body: any, options: any = {}) {
    const putOptions = { method: 'PUT', body: safeJSONStringify(body) };
    options = { ...options, ...putOptions };
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(`${fetchUrl()}/${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  del(url: String, queryParams: any, options: any = {}) {
    let qs;
    let newUrl;
    if (queryParams) {
      qs = createQueryString(queryParams);
      newUrl = `${fetchUrl()}/${url}?${qs}`;
    } else {
      newUrl = `${fetchUrl()}/${url}`;
    }
    const deleteOptions = { method: 'DELETE', body: safeJSONStringify(options) };
    options = { ...options, ...deleteOptions };
    const optionsWithHeaders = this.createOptions(url, options);
    return fetch(newUrl, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }

  handleMultipart(url: String, obj: any, files: any, method: String, options: any = {}) {
    const formData = new FormData();
    if (obj)
      Object.keys(obj).forEach(
        (key) =>
          !isNull(obj[key]) &&
          !isUndefined(obj[key]) &&
          formData.append(key, obj[key])
      );
    const postOptions = { method, body: formData };
    if (!isEmpty(files)) {
      Object.keys(files).forEach((key) => {
        files[key].forEach((file) => formData.append(key, file));
      });
    }
    options = { ...options, ...postOptions };
    const optionsWithHeaders = this.createOptions(url, options, true);
    let contentHeader;
    return fetch(`${fetchUrl()}/${url}`, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .then((data) => {
        contentHeader = data.headers && data.headers.get('content-disposition');
        if (!contentHeader) {
          return data;
        }
        return data.blob();
      })
      .then((blob) => {
        if (!contentHeader) {
          return blob;
        }
        const fileName = decodeURIComponent(
          contentHeader.match(/filename="(.+)"/)[1]
        );
        const objectUrl = window.URL.createObjectURL(blob);
        const aTag = document.createElement('a');
        aTag.href = objectUrl;
        aTag.download = fileName;
        aTag.click();
        aTag.remove();
        return { success: true };
      })
      .catch((e) => fetchErrorHandler(e));
  }

  handleServerSide(param: any = null, options: any = {}) {
    const { path, query, context = {}, method } = param;
    const { url, token } = fetchUrlFromCookie(context);
    const pathUrl = `${url}/${path}`;
    let qs;
    let newUrl;
    if (query) {
      qs = createQueryString(query);
      newUrl = `${pathUrl}/?${qs}`;
    } else {
      newUrl = `${pathUrl}`;
    }
    const getOptions = { method: method || 'GET' };
    options = { ...options, ...getOptions, token };
    const optionsWithHeaders = this.createOptions(newUrl, options);
    return fetch(newUrl, optionsWithHeaders)
      .then(fetchHandler)
      .then(checkSuccess)
      .catch((e) => fetchErrorHandler(e));
  }
}

const httpInstance = new Http();

export default httpInstance;
