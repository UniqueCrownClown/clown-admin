/**
 * Build Key-Value(s) Maps with custom config
 */

const toRawType = (val: unknown) =>
  Object.prototype.toString.call(val).slice(8, -1);

const isPropertyKey = (val: unknown): val is PropertyKey =>
  ["String", "Number", "Symbol"].includes(toRawType(val));

// Use lodash.pick instead
const pick = <T extends object>(target: T, keys: (keyof T)[]) => {
  return keys.reduce((dict, key) => ({ ...dict, [key]: target[key] }), {});
};

type ValidKeys<T, K extends keyof T = keyof T> = K extends K
  ? T[K] extends PropertyKey
    ? K
    : never
  : never;

function defineMap<T extends object, K extends keyof T>(
  defs: T[],
  key: K
): T[K][];
function defineMap<T extends object, K extends ValidKeys<T>, V extends keyof T>(
  defs: T[],
  key: K,
  values: V
): Record<T[K] extends PropertyKey ? T[K] : never, T[V]>;
function defineMap<T extends object, K extends ValidKeys<T>, V extends keyof T>(
  defs: T[],
  key: K,
  values: V[]
): Record<T[K] extends PropertyKey ? T[K] : never, Pick<T, V>>;
function defineMap<T extends object, K extends keyof T, V extends keyof T>(
  defs: T[],
  key: K,
  values?: V | V[]
) {
  if (typeof values === "undefined") {
    return defs.map((def) => def[key]);
  }

  return defs.reduce((map, def) => {
    const _key = def[key];
    if (!isPropertyKey(_key)) return map;

    const _val = Array.isArray(values) ? pick(def, values) : def[values];

    return { ...map, [_key]: _val };
  }, {});
}

export default defineMap;
