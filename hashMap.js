import hash from "./hash.js";
import {
  appendList,
  countList,
  createNode,
  find,
  findReplaceValue,
  getListEntries,
  getListKeys,
  getListValues,
  removeFromList,
  unshiftList,
} from "./utils.js";

const handleSet = (key, value, buckets, size) => {
  const hashCode = hash(key, size);
  let bucketNode;

  if (buckets.length > 0) {
    bucketNode = buckets[hashCode];
  }

  if (bucketNode) {
    if (bucketNode.key !== key) {
      // append entry to linkedList
      buckets[hashCode] = appendList(key, value, buckets[hashCode]);
    } else {
      // replace value of entry if it exists
      buckets[hashCode] = findReplaceValue(key, value, buckets[hashCode]);
    }
  } else {
    // add new entry
    buckets[hashCode] = createNode(key, value);
  }
};

class HashMap {
  size = 16;
  buckets = [];
  loadFactor = 0.8;
  limit = Math.floor(this.size * this.loadFactor);

  set(key, value) {
    if (this.length() >= this.limit) {
      this.grow();
      console.log("Growing.....");
      handleSet(key, value, this.buckets, this.size);
    } else {
      handleSet(key, value, this.buckets, this.size);
    }
  }

  get(key) {
    const hashCode = hash(key, this.size);

    if (hashCode < 0 || hashCode >= this.size) {
      throw new Error("Trying to access index out of bound");
    }

    const node = this.buckets[hashCode];

    if (node) {
      let itContainsNextNode = Object.keys(node).includes("nextNode");

      if (node.key !== key && itContainsNextNode) {
        let innerNode = find(key, node);
        if (innerNode) {
          return innerNode.value;
        }
      } else if (!itContainsNextNode || node.key === key) {
        return node.value;
      }
    }

    return null;
  }

  has(key) {
    return this.get(key) ? true : false;
  }

  remove(key) {
    const hashCode = hash(key, this.size);
    const bucketNode = this.buckets[hashCode];

    if (bucketNode) {
      if (!bucketNode.nextNode) {
        this.buckets[hashCode] = null;
        return true;
      } else {
        // head of the tree
        if (bucketNode.key === key) {
          this.buckets[hashCode] = unshiftList(this.buckets[hashCode]);
        } else {
          // innerNode
          this.buckets[hashCode] = removeFromList(key, bucketNode);
        }
        return true;
      }
    }

    return false;
  }

  length() {
    let total = 0;
    this.buckets.forEach((el) => {
      if (el.nextNode) {
        total += countList(el);
      } else {
        total += 1;
      }
    });
    return total;
  }

  clear() {
    this.buckets = [];
  }

  keys() {
    let keys = [];

    this.buckets.forEach((el) => {
      if (el.nextNode) {
        keys = keys.concat(getListKeys(el));
      } else {
        keys.push(el.key);
      }
    });

    return keys;
  }

  values() {
    let values = [];

    this.buckets.forEach((el) => {
      if (el.nextNode) {
        values = values.concat(getListValues(el));
      } else {
        values.push(el.value);
      }
    });

    return values;
  }

  entries() {
    let entriesArr = [];

    this.buckets.forEach((el) => {
      if (el.nextNode) {
        entriesArr = entriesArr.concat(getListEntries(el));
      } else {
        entriesArr.push([el.key, el.value]);
      }
    });

    return entriesArr;
  }

  grow() {
    this.size = this.size + 2;
    let backup = this.buckets;
    this.buckets = [];

    backup.forEach((el) => {
      if (el.nextNode) {
        let current = el;
        while (current.nextNode !== null) {
          this.set(current.key, current.value);
          current = current.nextNode;
        }
      } else {
        this.set(el.key, el.value);
      }
    });

    backup = null;
  }

  getMap() {
    console.log(this.buckets)
    return this.buckets;
  }
}

export default HashMap;
