export const createNode = (key, value) => {
  return { key, value, nextNode: null };
};

export const appendList = (key, value, head) => {
  let node = createNode(key, value);

  if (!head) {
    head = node;
    return head;
  }

  let current = head;

  while (current.nextNode !== null) {
    current = current.nextNode;
  }

  current.nextNode = node;
  return head;
};

export const find = (key, head) => {
  if (!head) return null;
  let current = head;
  let isContains = null;
  while (current !== null) {
    if (current.key === key) {
      return current;
    }
    current = current.nextNode;
  }
  return isContains;
};

export const findReplaceValue = (key, value, head) => {
  if (!head) return null;
  let current = head;
  while (current !== null) {
    if (current.key === key) {
      current.value = value;
      break;
    }
    current = current.nextNode;
  }
  return head;
};

export const unshiftList = (head) => {
  if (!head) return null;
  return head.nextNode;
};

export const removeFromList = (key, head) => {
  if (!head) return null;
  let prev = head;
  while (prev.nextNode !== null) {
    if (prev.nextNode.key === key) {
      prev.nextNode = prev.nextNode.nextNode;
      break;
    }
    prev = prev.nextNode;
  }
  return head;
};

export const countList = (head) => {
  let count = 0;
  let current = head;

  while (current !== null) {
    count += 1;
    current = current.nextNode;
  }

  return count;
};

export const getListKeys = (head) => {
  const keys = [];

  let current = head;

  while (current !== null) {
    keys.push(current.key);
    current = current.nextNode;
  }

  return keys;
};

export const getListValues = (head) => {
  const values = [];

  let current = head;

  while (current !== null) {
    values.push(current.value);
    current = current.nextNode;
  }

  return values;
};

export const getListEntries = (head) => {
  const entries = [];

  let current = head;

  while (current !== null) {
    entries.push([current.key, current.value]);
    current = current.nextNode;
  }

  return entries;
};
