type ClassProperties<T> = {
  [K in keyof T]: T[K] extends Function ? never : T[K];
};

export class Base {
  constructor(data?: unknown) {
    if (data) {
      Object.assign(this, data);
    }
  }

  toJson() {
    return JSON.stringify(this.properties());
  }

  toRaw() {
    return this.toObject();
  }

  toObject() {
    return this.properties() as any;
  }

  properties(): Record<string, unknown> {
    const ownProperties: Record<string, unknown> = {};
    for (const entrie of Object.entries(this)) {
      ownProperties[entrie[0]] = entrie[1];
    }
    return ownProperties;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toDomain<T extends typeof Base>(this: T, data?: Partial<InstanceType<T> & { _id?: any }>) {
    return new this({ ...data, _id: data?._id?.toString() }) as InstanceType<T>;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static toBatchDomain<T extends typeof Base>(this: T, data: Partial<InstanceType<T> & { _id?: any }>[]) {
    return data.map((item) => Base.toDomain({ ...item, _id: item?._id?.toString() })) as InstanceType<T>[];
  }
}
