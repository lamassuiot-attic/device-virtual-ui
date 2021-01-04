import React, { useState } from 'react';

import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { postSendMessage } from '../../services/api/backend';
import AlertBar from '../alert-bar';

export default function SendMessage() {
  const [message, setMessage] = useState('');
  const [topic, setTopic] = useState('lamassu-sample');
  const [error, setError] = useState(null);
  const [correct, setCorrect] = useState(null);

  const handleTopicValueChange = (event) => {
    setTopic(event.target.value);
  };

  const handleMessageValueChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendMessageSubmit = (event) => {
    const data = {
      message: message,
      topic: topic,
    };
    postSendMessage(data)
      .then((response) => {
        if (response.ok) {
          setCorrect('Message successfully sent');
          setError(null);
        } else {
          response.text().then((text) => {
            setError(text);
            setCorrect(null);
          });
        }
      })
      .catch((error) => setError(error.message));
    event.preventDefault();
  };

  return (
    <form onSubmit={handleSendMessageSubmit}>
      {error !== null && (
        <AlertBar setMessage={setError} message={error} type="error" />
      )}
      {correct !== null && (
        <AlertBar setMessage={setCorrect} message={correct} type="success" />
      )}
      <Grid container spacing={2} justify="center" alignItems="flex-end">
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Insert topic:</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Insert topic here"
                multiline
                fullWidth
                value={topic}
                onChange={handleTopicValueChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6">Insert message:</Typography>
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Insert message here"
                multiline
                fullWidth
                value={message}
                rows={2}
                onChange={handleMessageValueChange}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Button fullWidth type="submit" variant="contained" color="primary">
            Send Message
          </Button>
        </Grid>
      </Grid>
    </form>
  );
}
