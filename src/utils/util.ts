import { URL } from 'url';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  if (value === null) {
    return true;
  } else if (typeof value !== 'number' && value === '') {
    return true;
  } else if (typeof value === 'undefined' || value === undefined) {
    return true;
  } else if (value !== null && typeof value === 'object' && !Object.keys(value).length) {
    return true;
  } else {
    return false;
  }
};

export const isValidUrl = s => {
  try {
    new URL(s);
    return true;
  } catch {
    return false;
  }
};

export function getUrlExtension(url) {
  return url.split(/[#?]/)[0].split('.').pop().trim();
}
