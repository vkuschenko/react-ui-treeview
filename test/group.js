var React = require('react');
var expect = require('chai').expect;
var enzyme = require('enzyme');
var sinon = require('sinon');

var Group = require('../src/content/group');
var styles = require('../src/default-styles').content;

describe('<Group>', function() {

  it('Should render collapsed group correctly.', function() {
    var wrapper = enzyme.shallow(<Group styles={styles} collapsed={true} />);
    var ul = wrapper.find('ul');
    expect(ul).to.have.length(1);
    expect(ul.hasClass('group')).to.equal(true);
    expect(ul.hasClass('group-collapsed')).to.equal(true);
  });

  it('Should render expanded group correctly.', function() {
    var wrapper = enzyme.shallow(<Group styles={styles} collapsed={false} />);
    var ul = wrapper.find('ul');
    expect(ul).to.have.length(1);
    expect(ul.hasClass('group')).to.equal(true);
    expect(ul.hasClass('group-collapsed')).to.equal(false);
  });

  it('Should render root collapsed group correctly.', function() {
    var wrapper = enzyme.shallow(<Group styles={styles} collapsed={true} root={true} />);
    var ul = wrapper.find('ul');
    expect(ul).to.have.length(1);
    expect(ul.hasClass('group')).to.equal(true);
    expect(ul.hasClass('group-collapsed')).to.equal(true);
    expect(ul.hasClass('group-root')).to.equal(true);
  });

  it('Should render root expanded group correctly.', function() {
    var wrapper = enzyme.shallow(<Group styles={styles} collapsed={false} root={true} />);
    var ul = wrapper.find('ul');
    expect(ul).to.have.length(1);
    expect(ul.hasClass('group')).to.equal(true);
    expect(ul.hasClass('group-collapsed')).to.equal(false);
    expect(ul.hasClass('group-root')).to.equal(true);
  });

  it('Should render any children correctly.', function() {
    var wrapper = enzyme.shallow(
      <Group styles={styles} collapsed={false}>
        <span>test</span>
      </Group>
    );
    var span = wrapper.find('span');
    expect(span).to.have.length(1);
  });
});