import React, { useState } from 'react';

import { Container, Grid } from '@material-ui/core';

import Connect from '../connect';
import SendMessage from '../send-message';

export default function Home() {
  const [isConnected, setIsConnected] = useState(false);

  return (
    <Container maxWidth="md">
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Connect isConnected={isConnected} setIsConnected={setIsConnected} />
        </Grid>
        <Grid item xs={12}>
          <SendMessage isConnected={isConnected} />
        </Grid>
      </Grid>
    </Container>
  );
}
