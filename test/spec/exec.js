var expect = require('chai').expect;
var property = require('../..')
  , exec = property.exec;

describe('cli-property:', function() {
  it('should exec pattern on object keys', function(done) {
    var source = {
      bools: {truthy: true, falsy: false},
    };
    var ptn = /y$/;
    var res = exec(ptn, source);
    //console.dir(res);
    expect(res).to.be.an('array');
    expect(res.length).to.eql(2);

    var truthy = res[0];
    expect(truthy).to.be.an('object')
    expect(truthy.key).to.eql('truthy');
    expect(truthy.value).to.eql(true);
    expect(truthy.parent).to.equal(source.bools);
    expect(truthy.pattern).to.equal(ptn);

    var falsy = res[1];
    expect(falsy).to.be.an('object')
    expect(falsy.key).to.eql('falsy');
    expect(falsy.value).to.eql(false);
    expect(falsy.parent).to.equal(source.bools);
    expect(falsy.pattern).to.equal(ptn);

    done();
  });


  it('should exec pattern on object keys (single match)', function(done) {
    var source = {
      bools: {truthy: true, falsy: false},
    };

    var ptn = /hy$/;
    var res = exec(ptn, source);

    expect(res).to.be.an('array');
    expect(res.length).to.eql(1);

    var truthy = res[0];
    expect(truthy).to.be.an('object')
    expect(truthy.key).to.eql('truthy');
    expect(truthy.value).to.eql(true);
    expect(truthy.parent).to.equal(source.bools);
    expect(truthy.pattern).to.equal(ptn);

    done();
  });


  it('should find by value match', function(done) {
    var source = {
      bools: {truthy: true, falsy: false},
    };

    var ptn = /^tr/;
    var res = exec(ptn, source);

    expect(res).to.be.an('array');
    expect(res.length).to.eql(1);

    var truthy = res[0];
    expect(truthy).to.be.an('object')
    expect(truthy.key).to.eql('truthy');
    expect(truthy.value).to.eql(true);
    expect(truthy.parent).to.equal(source.bools);
    expect(truthy.pattern).to.equal(ptn);

    done();
  });


  it('should find by flat key match', function(done) {
    var source = {
      bools: {truthy: true, falsy: false},
    };

    var ptn = /^bools\.tr.*$/;
    var res = exec(ptn, source, {flat: true});

    expect(res).to.be.an('array');
    expect(res.length).to.eql(1);

    var truthy = res[0];
    expect(truthy).to.be.an('object')
    expect(truthy.key).to.eql('bools.truthy');
    expect(truthy.value).to.eql(true);
    expect(truthy.pattern).to.equal(ptn);

    done();
  });


  it('should find by key only', function(done) {
    var source = {
      values: {yes: true, color: 'yellow'},
    };

    var ptn = /^y.*$/;
    var res = exec(ptn, source, {keys: true, values: false});

    expect(res).to.be.an('array');
    expect(res.length).to.eql(1);

    var yes = res[0];
    expect(yes).to.be.an('object')
    expect(yes.key).to.eql('yes');
    expect(yes.value).to.eql(true);
    expect(yes.parent).to.equal(source.values);
    expect(yes.pattern).to.equal(ptn);

    done();
  });


  it('should find by value only', function(done) {
    var source = {
      values: {yes: true, color: 'yellow'},
    };

    var ptn = /^y.*$/;
    var res = exec(ptn, source, {keys: false, values: true});

    expect(res).to.be.an('array');
    expect(res.length).to.eql(1);

    var yellow = res[0];
    expect(yellow).to.be.an('object')
    expect(yellow.key).to.eql('color');
    expect(yellow.value).to.eql('yellow');
    expect(yellow.parent).to.equal(source.values);
    expect(yellow.pattern).to.equal(ptn);

    done();
  });
})
