export type FindAllCriteria<T> = Partial<{
  [K in keyof T]?: T[K] extends (infer U)[] ? { $in: T[K] } : T[K] | { $in: T[K][] };
}>;
