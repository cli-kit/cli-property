var expect = require('chai').expect;
var property = require('../..')
  , expand = property.expand;

describe('cli-property:', function() {
  it('should expand object keys', function(done) {
    var ptn = 'field.deep.num';
    var expected = {field: {deep: {num: 10}}};
    var o = {};
    o[ptn] = 10;
    var res = expand(o);
    expect(res).to.eql(expected);
    done();
  });


  it('should expand on no delimiter', function(done) {
    var ptn = 'field.deep.num';
    var expected = {field: {deep: {num: 10}}, simple: 20};
    var o = {};
    o[ptn] = 10;
    o.simple = 20;
    var res = expand(o);
    expect(res).to.eql(expected);
    done();
  });
})
