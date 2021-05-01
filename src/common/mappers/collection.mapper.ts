// Esta es una función que se usa para mapear una colección
export const mapToCollection = <A, B>(collection: A[], mapFn: (A) => B): B[] =>
  Array.isArray(collection) ? collection.map(mapFn) : [];
