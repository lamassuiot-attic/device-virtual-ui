import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Container, Box, Grid } from '@material-ui/core';

import Communication from './communication';

describe('<Communication />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('Communication rendering', () => {
    const wrapper = shallow(<Communication />);

    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(4);
  });
});
