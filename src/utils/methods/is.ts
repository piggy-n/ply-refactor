export const isArray = (v: unknown) => Array.isArray(v);
export const isUndefined = (v: unknown) => v == null;
export const isNotUndefined = (v: unknown) => v != null;
export const isFunc = (v: unknown) => typeof v === 'function';
export const isNumber = (v: unknown) => typeof v === 'number';
export const isObject = (v: unknown) => v && typeof v === 'object' && !isArray(v);
export const isString = (v: unknown) => typeof v === 'string';
export const isBoolean = (v: unknown) => typeof v === 'boolean';
