/* eslint-disable @typescript-eslint/no-explicit-any */
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
    for (const entry of Object.entries(this)) {
      ownProperties[entry[0]] = entry[1];
    }

    return ownProperties;
  }

  static toDomain<T extends typeof Base>(this: T, data?: any) {
    return new this(JSON.parse(JSON.stringify(data))) as InstanceType<T>;
  }

  static toBatchDomain<T extends typeof Base>(this: T, data: any[]) {
    return data.map((item) => Base.toDomain({ ...item, _id: item?._id?.toString() })) as InstanceType<T>[];
  }
}
