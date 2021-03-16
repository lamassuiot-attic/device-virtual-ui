import React from 'react';
import { createMount } from '@material-ui/core/test-utils';
import { act } from 'react-dom/test-utils';

import { Grid, Button, Typography, TextField } from '@material-ui/core';

import Connect from './connect';
import { postConnect, postDisconnect } from '../../services/api/backend';
import AlertBar from '../alert-bar';

jest.mock('../../services/api/backend');

describe('<Connect />', () => {
  let mount = null;

  beforeAll(() => {
    mount = createMount();
  });

  afterAll(() => {
    mount.cleanUp();
  });

  it('Connect rendering with no error', async () => {
    let wrapper;
    await act(async () => {
      wrapper = mount(<Connect />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(17);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(4);
    expect(wrapper.find(TextField)).toHaveLength(4);
  });

  it('Connect rendering with correct connect', async () => {
    const event = { preventDefault: () => {} };

    postConnect.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Connect />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(17);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(4);
    expect(wrapper.find(TextField)).toHaveLength(4);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postConnect).toHaveBeenCalledTimes(1);
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('success');
  });

  it('Connect rendering with connect error', async () => {
    const event = { preventDefault: () => {} };

    postConnect.mockImplementation(() => {
      return Promise.resolve({
        ok: false,
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Connect />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(17);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(4);
    expect(wrapper.find(TextField)).toHaveLength(4);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postConnect).toHaveBeenCalledTimes(2);
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
  });

  it('Connect rendering with correct disconnect', async () => {
    const event = { preventDefault: () => {} };

    postConnect.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });

    postDisconnect.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Connect />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(17);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(4);
    expect(wrapper.find(TextField)).toHaveLength(4);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postConnect).toHaveBeenCalledTimes(3);
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('success');

    const disconnect = wrapper.find(Button).last();
    expect(disconnect.prop('disabled')).toBe(false);

    await act(async () => {
      disconnect.props().onClick(event);
    });

    expect(postDisconnect).toHaveBeenCalledTimes(1);
    wrapper.update();
    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('success');
  });

  it('Connect rendering with disconnect error', async () => {
    const event = { preventDefault: () => {} };

    postConnect.mockImplementation(() => {
      return Promise.resolve({
        ok: true,
      });
    });

    postDisconnect.mockImplementation(() => {
      return Promise.reject(new Error('unable to disconnect'));
    });

    let wrapper;
    await act(async () => {
      wrapper = mount(<Connect />);
    });
    wrapper.update();

    expect(wrapper.find(Grid)).toHaveLength(17);
    expect(wrapper.find(Button)).toHaveLength(2);
    expect(wrapper.find(Typography)).toHaveLength(4);
    expect(wrapper.find(TextField)).toHaveLength(4);

    const form = wrapper.find('form');

    await act(async () => {
      form.props().onSubmit(event);
    });

    expect(postConnect).toHaveBeenCalledTimes(4);
    wrapper.update();

    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('success');

    const disconnect = wrapper.find(Button).last();
    expect(disconnect.prop('disabled')).toBe(false);

    await act(async () => {
      disconnect.props().onClick(event);
    });

    expect(postDisconnect).toHaveBeenCalledTimes(2);
    wrapper.update();
    expect(wrapper.find(AlertBar)).toHaveLength(1);
    expect(wrapper.find(AlertBar).prop('type')).toBe('error');
  });
});
