import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import Expander from '../src/content/expander';
import styles from '../src/default-styles';

const content = styles.content;

describe('<Expander>', () => {

  it('Closed expander should be rendered correctly.', () => {
    const wrapper = shallow(<Expander styles={content} collapsed={true} id={1} />);
    const div = wrapper.find('div');
    expect(div).to.have.length(1);
    expect(div.hasClass('expander')).to.equal(true);
    expect(div.hasClass('collapsed')).to.equal(true);
  });

  it('Opened expander should be rendered correctly.', () => {
    const wrapper = shallow(<Expander styles={content} collapsed={false} id={1} />);
    const div = wrapper.find('div');
    expect(div).to.have.length(1);
    expect(div.hasClass('expander')).to.equal(true);
    expect(div.hasClass('opened')).to.equal(true);
  });

  it('Should call `onClick` if clicked.', () => {
    const onClick = sinon.spy();
    const wrapper = shallow(
      <Expander styles={content} collapsed={true} id={1} />,
      { context: { handlerExpanderClick: onClick } }
    );
    const div = wrapper.find('div');
    div.simulate('click');
    expect(onClick.called);
    expect(onClick.calledWith(1));
  });

});