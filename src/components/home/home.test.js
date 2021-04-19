import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Container, Grid } from '@material-ui/core';

import Home from './home';

describe('<Home />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('Home rendering', () => {
    const wrapper = shallow(<Home />);

    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(3);
  });
});
