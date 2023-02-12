// https://github.com/misskey-dev/misskey/blob/b427bf70a8519e2a54aa6231d05b58f00542542c/packages/frontend/src/scripts/clone.ts#L6

type Cloneable =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Cloneable }
  | Cloneable[]

export function deepClone<T extends Cloneable>(x: T): T {
  if (typeof x === 'object') {
    if (x === null) {
      return x
    }
    if (Array.isArray(x)) {
      return x.map(deepClone) as T
    }
    const obj = {} as Record<string, Cloneable>
    for (const [k, v] of Object.entries(x)) {
      obj[k] = deepClone(v)
    }
    return obj as T
  } else {
    return x
  }
}
