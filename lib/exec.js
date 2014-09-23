var flatten = require('./flatten')
  , regexp = require('cli-regexp')
  , recopy = regexp.copy;

/**
 *  Execute a regular expression pattern against
 *  an object finding all values that match the pattern.
 *
 *  Returns an array of result object.
 *
 *  @param ptn The regular expression to execute.
 *  @param source The source object to search.
 *  @param opts Processing options.
 *  @param opts.flat Compare against flattened object keys.
 *  @param opts.keys Match against keys.
 *  @param opts.values Match against values.
 */
function exec(ptn, source, opts) {
  opts = opts || {};
  var list = []
    , flat = opts.flat = opts.flat !== undefined ? opts.flat : false
    , keys = opts.keys = opts.keys !== undefined ? opts.keys : true
    , values = opts.values = opts.values !== undefined ? opts.values : false

  if(flat) {
    source = flatten(source);
  }

  //console.dir(source);

  function match(k, v, p) {
    var re = recopy(ptn)
      , res = {key: k, value: v, parent: p, match: {key: false, value: false}};
    res.match.key = keys && re.test(k);
    res.match.value = values && re.test('' + v);
    //console.log('matches %s %s %s', matches, re, k);
    if(res.match.key || res.match.value) {
      res.pattern = ptn;
      list.push(res);
    }
  }

  function lookup(source) {
    var k, v;
    for(k in source) {
      v = source[k];
      match(k, v, source);
      if(!flat && v && typeof v === 'object' && Object.keys(v).length) {
        lookup(v);
      }
    }
  }
  lookup(source);
  return list;
}

module.exports = exec;
