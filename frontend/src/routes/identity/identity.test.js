import React from 'react';
import { createShallow } from '@material-ui/core/test-utils';

import { Container, Box, Grid } from '@material-ui/core';

import Identity from './identity';

describe('<Identity />', () => {
  let shallow = null;

  beforeAll(() => {
    shallow = createShallow();
  });

  it('Identity rendering', () => {
    const mockIsConnected = true;
    const mockSetIsConnected = jest.fn();

    const wrapper = shallow(
      <Identity
        isConnected={mockIsConnected}
        setIsConnected={mockSetIsConnected}
      />
    );

    expect(wrapper.find(Container)).toHaveLength(1);
    expect(wrapper.find(Box)).toHaveLength(1);
    expect(wrapper.find(Grid)).toHaveLength(4);
  });
});
