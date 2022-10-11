import { isEmpty, last } from 'lodash';

export const safeJSONParse = (input, defaultVal = {}) => {
  let json;
  if (input !== null && typeof input === 'object') {
    return input;
  }
  try {
    json = JSON.parse(input);
  } catch (er) {
    json = defaultVal;
  }
  return json || defaultVal;
};

export const safeJSONStringify = (input, defaultVal = '') => {
  let json;
  if (typeof input === 'string') {
    return input;
  }
  try {
    json = JSON.stringify(input);
  } catch (ex) {
    json = undefined;
  }
  return json || defaultVal || '';
};

export const removeFileExtenstion = (fileName) => {
  const splitText = fileName.split('.');
  splitText.pop();
  return splitText.join('.');
};

export const getFileExtension = (fileName) => last(fileName.split('.'));

export const convertCommaSeparated = (value) =>
  Array.isArray(value) && !isEmpty(value) ? value.join(',') : '';

export const CurrencyFormatter = (props) => {
  const { value, type = 'INR', language = 'en-IN' } = props;
  const data = !value ? 0 : value;
  return Intl.NumberFormat(language, {
    style: 'currency',
    currency: type,
  }).format(data);
};

export const arrayChunk = (array, size) => {
  const newArray = [];
  while (array.length) {
    const chunk = array.splice(0, size);
    newArray.push(chunk);
  }
  return newArray;
};

export const phoneNumberFormat = (data) => {
  if (!data) return data;
  return `+91 ${data}`;
};

export const priceFormat = (data) => {
  if (!data) return data;
  return `₹${data}`;
};

export const getAvatarLetters = (data) => {
  if (!data) return data;
  return (data.match(/\b(\w)/g) || []).join('').toUpperCase();
};
