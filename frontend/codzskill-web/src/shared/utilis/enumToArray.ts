export function getEnumKeyValue(enumData: { [s: string]: unknown; } | ArrayLike<unknown>) {
    const enumerableObject = [];
    const keys = Object.keys(enumData);
    const values = Object.values(enumData);

    for (let i = 0;i<Math.ceil(keys.length/2) ; i++) {
      enumerableObject.push({ key: keys[i], value: values[i] });
    }
    return enumerableObject
    
  }