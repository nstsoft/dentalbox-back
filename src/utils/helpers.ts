/* eslint-disable @typescript-eslint/no-explicit-any */
import { ObjectId } from 'mongodb';

const isObjectId = (value: unknown) => {
  return typeof value === 'object' && value !== null && value.constructor && value.constructor.name === 'ObjectId';
};

export const removeUndefinedProps = (obj: any) => {
  if (Array.isArray(obj)) {
    // Process arrays
    for (let i = 0; i < obj.length; i++) {
      obj[i] = removeUndefinedProps(obj[i]);
    }
  } else if (obj && typeof obj === 'object' && !(obj instanceof Date) && !isObjectId(obj)) {
    // Process objects
    for (const key in obj) {
      // eslint-disable-next-line no-prototype-builtins
      if (obj.hasOwnProperty(key)) {
        obj[key] = removeUndefinedProps(obj[key]);
        if (
          obj[key] === null ||
          obj[key] === undefined ||
          obj[key] === '' ||
          (typeof obj[key] === 'object' &&
            Object.keys(obj[key]).length === 0 &&
            !(obj[key] instanceof Date) &&
            !isObjectId(obj[key]))
        ) {
          delete obj[key];
        }
      }
    }
  }
  return obj;
};

export const deepParseObjectId = (obj: any): any => {
  if (Array.isArray(obj)) {
    // Process arrays
    for (let i = 0; i < obj.length; i++) {
      obj[i] = deepParseObjectId(obj[i]);
    }
  } else if (obj && typeof obj === 'object') {
    for (const key in obj) {
      if (ObjectId.isValid(obj[key])) {
        obj[key] = ObjectId.createFromHexString(obj[key]);
      } else if (typeof obj[key] === 'object') {
        return deepParseObjectId(obj[key]);
      }
    }
  }
  return obj;
};

export const generateOTP = (length = 6) => {
  let otp = '';

  for (let i = 0; i < length; i++) {
    const randomDigit = Math.floor(Math.random() * 10);
    otp += randomDigit;
  }

  return +otp;
};
