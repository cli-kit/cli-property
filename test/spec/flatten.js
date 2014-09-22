var expect = require('chai').expect;
var property = require('../..')
  , flatten = property.flatten;

describe('cli-property:', function() {
  it('should flatten object keys', function(done) {
    var expected = {
      'field.deep.num': 10,
      flat: 20,
      'bools.truthy': true,
      'bools.falsy': false,
      'nil': null,
      'obj.property': {},
      'arr.0': 1,
      'arr.1': 2,
      'arr.2': 3,
    }
    var source = {
      field: {deep: {num: 10}},
      flat: 20,
      bools: {truthy: true, falsy: false},
      nil: null,
      obj: {property: {}},
      arr: [1,2,3]
    };
    var res = flatten(source);
    //console.dir(res);
    expect(res).to.eql(expected);
    done();
  });
})
