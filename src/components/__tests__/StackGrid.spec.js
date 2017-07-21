import React from 'react';
import { mount } from 'enzyme';
import StackGrid, { easings, transitions } from '../../';
import { GridInline } from '../StackGrid';


const mockProps = {
  size: {
    width: 960,
    height: 0,
  },
  style: {},
  refCallback: () => {},
  component: 'div',
  columnWidth: 150,
  gutterWidth: 5,
  gutterHeight: 5,
  duration: 480,
  easing: easings.quartOut,
  appearDelay: 30,
  appear: transitions.fadeUp.appear,
  appeared: transitions.fadeUp.appeared,
  enter: transitions.fadeUp.enter,
  entered: transitions.fadeUp.entered,
  leaved: transitions.fadeUp.leaved,
  units: { length: 'px', angle: 'deg' },
  monitorImagesLoaded: false,
  vendorPrefix: true,
  userAgent: null,
};


describe('<StackGrid /> (GridInline)', () => {
  test('Should not be render children', () => {
    const wrapper = mount(
      <StackGrid />
    );

    expect(wrapper.children().length).toBe(0);
  });


  test('Should be pass the base props', () => {
    const wrapper = mount(
      <StackGrid
        className="rsg-grid"
        style={{
          width: 960,
          background: '#fff',
        }}
      >
        <div key="A">A</div>
      </StackGrid>
    );

    expect(wrapper.props().className).toBe('rsg-grid');
    expect(wrapper.props().style).toEqual({
      width: 960,
      background: '#fff',
    });
  });


  test('Should be render with specify component', () => {
    const wrapper = mount(
      <GridInline
        {...mockProps}
        className="rsg-grid"
        component="section"
      >
        <div key="A">A</div>
      </GridInline>
    );

    expect(wrapper.find('section.rsg-grid').length).toBe(1);
  });


  test('Should be render children', () => {
    const wrapper = mount(
      <GridInline {...mockProps}>
        <div className="item" key="1">ITEM 1</div>
        <div className="item" key="2">ITEM 2</div>
        <div className="item" key="3">ITEM 3</div>
      </GridInline>
    );

    expect(wrapper.find('div.item').length).toBe(3);
  });


  test('Should be get grid ref', () => {
    const callback = jest.fn();
    const wrapper = mount(
      <GridInline
        {...mockProps}
        refCallback={callback}
      >
        <div key="1">Foo</div>
      </GridInline>
    );

    expect(callback.mock.calls.length).toBe(1);
    expect(callback.mock.calls[0]).toEqual([
      wrapper.instance(),
    ]);
  });
});
