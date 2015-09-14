/**
 *  Accept a string dot delimited key and attempt to lookup the
 *  property on a target object.
 *
 *  Returns an object containing the fields:
 *
 *  1. key - The name of the property on the parent.
 *  2. value - The property value.
 *  3. parent - The parent object.
 *  4. path - A string dot delimited path to the object.
 *
 *  @param key String dot delimited property reference.
 *  @param target The target object.
 *  @param opts Processing opts.
 *  @param opts.re An alternative regular
 *  expression used to split the key.
 *  @param opts.create Create objects for each
 *  part in the path.
 */
function find(key, target, opts) {
  opts = opts || {};
  var path = []
    , o = target, i, k, p
    , re = opts.re = opts.re || /\./
    , parts = key.split(re);
  for(i =0;i < parts.length;i++) {
    k = parts[i];
    p = o;
    if(opts.create && o[k] === undefined) o[k] = {};
    o = o[k];
    path.push(k);
    if(!o) break;
  }
  return {key: k, value: o, parent: p, path: path.join('.')};
}

module.exports = find;
