import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { Grid, Typography, TextField, Button } from '@material-ui/core';

import AlertBar from '../alert-bar';
import { postSendMessage } from '../../services/api/backend';
import SendMessage from './send-message';

jest.mock('../../services/api/backend');

describe('<SendMessage />', () => {
  let mount = null;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('SendMessage rendering with no error', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<SendMessage />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(10);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);
  });

  it('SendMessage rendering with correct message submit', async () => {
    const event = { preventDefault: () => {} };
    postSendMessage.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });
    let wrapper;
    await act(async () => {
      wrapper = mount(<SendMessage />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(10);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);

    const form = wrapper.find('form');
    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postSendMessage).toHaveBeenCalledTimes(1);
    wrapper.update();
    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('success');
  });

  it('SendMessage rendering with message submit error', async () => {
    const event = { preventDefault: () => {} };
    postSendMessage.mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });
    let wrapper;
    await act(async () => {
      wrapper = mount(<SendMessage />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(10);
    expect(wrapper.find(Typography)).toHaveLength(2);
    expect(wrapper.find(TextField)).toHaveLength(2);
    expect(wrapper.find(Button)).toHaveLength(1);

    const form = wrapper.find('form');
    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postSendMessage).toHaveBeenCalledTimes(2);
    wrapper.update();
    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
  });
});
