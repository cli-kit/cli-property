var expect = require('chai').expect;
var property = require('../..')
  , find = property.find;

function structure(res, ptn) {
  expect(res).to.be.an('object');
  expect(res.key).to.be.a('string');
  expect(res.parent).to.be.an('object');
  expect(res.path).to.be.a('string').to.eql(ptn);
}

describe('cli-property:', function() {

  it('should find target property', function(done) {
    var ptn = 'field.deep.num';
    var o = {field: {deep: {num: 10}}};
    var res = find(ptn, o);
    structure(res, ptn);
    expect(res.value).to.eql(10);
    done();
  });

  it('should create object structure', function(done) {
    var ptn = 'field.deep.num';
    var o = {};
    var res = find(ptn, o, {create: true});
    structure(res, ptn);
    expect(res.value).to.eql({});
    expect(res.parent.num).to.be.an('object');
    done();
  });

  it('should return undefined value on missing property', function(done) {
    var ptn = 'field.deep.number';
    var o = {field: {deep: {num: 10}}};
    var res = find(ptn, o);
    structure(res, ptn);
    expect(res.value).to.eql(undefined);
    done();
  });
})
