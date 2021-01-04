import React from 'react';

import { Container, Grid, Box, Typography, Divider } from '@material-ui/core';

import SendMessage from '../../components/send-message';

export default function Communication() {
  return (
    <Container maxWidth="md">
      <Box border={1} p={4} borderRadius="borderRadius">
        <Grid container spacing={2} justify="center">
          <Grid item xs={12}>
            <Typography variant="h3">Communication</Typography>
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12}>
            <SendMessage />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
