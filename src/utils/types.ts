export type Pagination = {
  skip: number;
  limit: number;
};

export type BaseEntity<T> = {
  [key in keyof T]: T[key];
} & {
  toRaw(): T;
  toObject(): T;
  toJson(): string;
  properties(): Record<string, unknown>;
};

export enum SEGMENT_COLORS {
  red = '#d93107',
  yellow = '#debb10',
  green = '#6dd611',
  blue = '#0d82db',
  purple = '#c410c7',
  default = '#0000',
}

export enum Sex {
  male = 'male',
  female = 'female',
}
