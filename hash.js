function hash(key, tableSize) {
  let hashCode = 0;
  const primeNumber = 31;
  for (let i = 0; i < key.length; i++) {
    hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % tableSize;
  }

  return hashCode;
}

export default hash;
