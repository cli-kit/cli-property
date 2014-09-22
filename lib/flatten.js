/**
 *  Flatten an object joining keys on a dot delimiter.
 *
 *  Returns the transformed object.
 *
 *  @param source The source object to transform.
 *  @param opts Processing options.
 *  @param opts.delimiter The string to join keys on.
 */
function flatten(source, opts) {
  opts = opts || {};
  var delimiter = opts.delimiter = opts.delimiter || '.';
  var o = {};
  function iterate(source, parts) {
    var k, v;
    parts = parts || [];
    for(k in source) {
      v = source[k];
      if(v && typeof v === 'object' && Object.keys(v).length) {
        iterate(v, parts.concat(k));
      }else{
        o[parts.concat(k).join(delimiter)] = v;
      }
    }
  }
  iterate(source);
  return o;
}

module.exports = flatten;
