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

export const isValidObjectId = (str: string) => {
  return ObjectId.isValid(str) && String(new ObjectId(str)) === str;
};

export const deepParseObjectId = (data: any): any => {
  if (Array.isArray(data)) {
    return data.map((item) => deepParseObjectId(item));
  }
  if (typeof data === 'object' && data !== null) {
    for (const key in data) {
      // eslint-disable-next-line no-prototype-builtins
      if (data.hasOwnProperty(key)) {
        data[key] = deepParseObjectId(data[key]);
      }
    }
    return data;
  }

  if (typeof data === 'string' && isValidObjectId(data)) {
    return new ObjectId(data);
  }

  return data;
};

export const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000);
};
