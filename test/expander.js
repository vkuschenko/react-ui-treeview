var React = require('react');
var expect = require('chai').expect;
var enzyme = require('enzyme');
var sinon = require('sinon');

var Expander = require('../src/content/expander');
var styles = require('../src/default-styles').content;

describe('<Expander>', function() {

  it('Closed expander should be rendered correctly.', function() {
    var wrapper = enzyme.shallow(<Expander styles={styles} collapsed={true} id={1} />);
    var div = wrapper.find('div');
    expect(div).to.have.length(1);
    expect(div.hasClass('expander')).to.equal(true);
    expect(div.hasClass('collapsed')).to.equal(true);
  });

  it('Opened expander should be rendered correctly.', function() {
    var wrapper = enzyme.shallow(<Expander styles={styles} collapsed={false} id={1} />);
    var div = wrapper.find('div');
    expect(div).to.have.length(1);
    expect(div.hasClass('expander')).to.equal(true);
    expect(div.hasClass('opened')).to.equal(true);
  });

  it('Should call `onClick` if clicked.', function() {
    var onClick = sinon.spy();
    var wrapper = enzyme.shallow(
      <Expander styles={styles} collapsed={true} id={1} />,
      { context: { handlerExpanderClick: onClick } }
    );
    var div = wrapper.find('div');
    div.simulate('click');
    expect(onClick.called);
    expect(onClick.calledWith(1));
  });

});