/**
 *  Takes a source object with dot-delimited keys
 *  and expands it to a deep object representation.
 *
 *  Such that:
 *
 *  {'obj.field.num': 10}
 *
 *  Becomes:
 *
 *  {obj:{field: {num: 10}}}
 *
 *  Returns the transformed object.
 *
 *  @param source The source object to expand.
 *  @param opts Processing opts.
 *  @param opts.re The string or regexp delimiter
 *  used to split the keys.
 */
function expand(source, opts) {
  opts = opts || {};
  var re = opts.re = opts.re || '.'
    , isre = (re instanceof RegExp)
    , o = {}, k, v, parts, i, p;
  for(k in source) {
    v = source[k];
    if(isre ? !re.test(k) : !~k.indexOf(re)) {
      o[k] = v;
    }else{
      parts = k.split(re);
      p = o;
      for(i = 0;i < parts.length;i++) {
        k = parts[i];
        if(i < parts.length - 1) {
          p[k] = p[k] || {};
          p = p[k];
        }else{
          p[k] = v;
        }
      }
    }
  }
  return o;
}

module.exports = expand;
