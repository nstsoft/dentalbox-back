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
