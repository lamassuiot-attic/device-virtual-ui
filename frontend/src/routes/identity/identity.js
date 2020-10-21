import React from 'react';
import PropTypes from 'prop-types';

import { Container, Grid, Box, Typography, Divider } from '@material-ui/core';

import Connect from '../../components/connect';

export default function Identity(props) {

    return(
        <Container maxWidth="md">
            <Box border={1} p={4} borderRadius="borderRadius">
                <Grid container spacing={2} justify="center">
                    <Grid item xs={12}>
                        <Typography variant="h3">
                            Identity
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider/>
                    </Grid>
                    <Grid item xs={12}>
                        <Connect isConnected={props.isConnected} setIsConnected={props.setIsConnected}/>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    )
}

Identity.propTypes = {
    isConnected: PropTypes.bool.isRequired,
    setIsConnected: PropTypes.func.isRequired
}