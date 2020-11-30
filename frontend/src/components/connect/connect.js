import React, { useState } from 'react';
import uuid from 'react-uuid';

import { Grid, Typography, TextField, Button } from '@material-ui/core';
import { postConnect, postDisconnect } from '../../services/api/backend';

import AlertBar from '../alert-bar';

export default function Connect() {
    const brokerProtocol = process.env.REACT_APP_BROKER_PROTOCOL
    const brokerHost = process.env.REACT_APP_BROKER_HOST
    const brokerPort = process.env.REACT_APP_BROKER_PORT

    const fakeCert = "-----BEGIN CERTIFICATE-----\nMIIDoTCCAomgAwIBAgIUNQ7h/ctroojAZHsyR/BbdG1TMkQwDQYJKoZIhvcNAQEL\nBQAwYDELMAkGA1UEBhMCRVMxETAPBgNVBAgMCEdpcHV6a29hMREwDwYDVQQHDAhB\ncnJhc2F0ZTEaMBgGA1UECgwRTEtTIE5leHQsIFMuQ29vcC4xDzANBgNVBAMMBmNs\naWVudDAeFw0yMDEwMTQyMjM0MTRaFw0yMDExMTMyMjM0MTRaMGAxCzAJBgNVBAYT\nAkVTMREwDwYDVQQIDAhHaXB1emtvYTERMA8GA1UEBwwIQXJyYXNhdGUxGjAYBgNV\nBAoMEUxLUyBOZXh0LCBTLkNvb3AuMQ8wDQYDVQQDDAZjbGllbnQwggEiMA0GCSqG\nSIb3DQEBAQUAA4IBDwAwggEKAoIBAQCwQZpUUQpeDIDN7yaGgeLcO8apGISGoOsH\np3QAS4M7rtVdB+/o/VhL/kzX6d5jJJzhvKexvgqoZCm2KerIqZbBq3BhhMj7k2h8\nPb3WfkDAwpxhLR5P3rdptjIjUgNZKgvG0lzsY0uzTYP4k4rRfwYK7752qf8JP1rG\nxL+NWaGqF2GBRqmknJxLDGeVe5KPZxJ95fGmCHNUjQL1aP+X5mIIXWsLkrXn5O3/\ndX+X9CVA/hYhbkYyhI69ojurokL8v03bR4C1MNiN0OGPg9Tu6RA3+RS8CzZRlPqM\nORVm3KWTlPSTmUlHl0x73GHKRfpny2/Pwu78TP8Mow019B/19OOZAgMBAAGjUzBR\nMB0GA1UdDgQWBBSH/kKSaHjMBqYFyzqBJL++T7aG/DAfBgNVHSMEGDAWgBSH/kKS\naHjMBqYFyzqBJL++T7aG/DAPBgNVHRMBAf8EBTADAQH/MA0GCSqGSIb3DQEBCwUA\nA4IBAQBAF5Y8+a+tkC+4i90FYcInUEUWICyPTdE9jswohxgq71at3U27pLIXNaOY\nGI2jsUNKZA/m87R1G14TuHmfkAv/Xinzr4nyhprTmhCydz5JicfW2tK7/La/WiGa\nIOLBK25jQEMYy3EQEMfqgRYHWXCMMnoY1s6W5QpWbwOEFN2n5YGExHNEI15CbQZF\nkC9YrQjR0syepqHJFAXQxXRdBltA07bIhTpecFOKjC9RSk3ep26kSirh23MfwoFn\nuG9qC3qPsavn9mifdKTRHRi25ydY4bLUkZ3YElxdAQw8BX8dVibdNPPqhlpvw/kV\nDXv/7XyJZMjVxC2xu2404ddjqml1\n-----END CERTIFICATE-----"
    const fakeKey = "-----BEGIN RSA PRIVATE KEY-----\nMIIEowIBAAKCAQEAsEGaVFEKXgyAze8mhoHi3DvGqRiEhqDrB6d0AEuDO67VXQfv\n6P1YS/5M1+neYySc4bynsb4KqGQptinqyKmWwatwYYTI+5NofD291n5AwMKcYS0e\nT963abYyI1IDWSoLxtJc7GNLs02D+JOK0X8GCu++dqn/CT9axsS/jVmhqhdhgUap\npJycSwxnlXuSj2cSfeXxpghzVI0C9Wj/l+ZiCF1rC5K15+Tt/3V/l/QlQP4WIW5G\nMoSOvaI7q6JC/L9N20eAtTDYjdDhj4PU7ukQN/kUvAs2UZT6jDkVZtylk5T0k5lJ\nR5dMe9xhykX6Z8tvz8Lu/Ez/DKMNNfQf9fTjmQIDAQABAoIBACXbMUaC0XM5xEB2\n6RNiulMLE7Ql6/DuhwxxztxxW5JqDrGYjtK/90L7L44AUR+CMZ/aYTov0yIvwTW6\n8w5+Pj8Cj3SijHhcRMjKigeTvlyob+X/Rs9oyoQN+d7UMpvoB/eAHy02dn/gWkP9\njIdKfQXEUGg0Qu69iMXAZFP7uFlLqMmVDJbEDThOP+OgPIa3QVFMBTo4d6FdhohO\nMaE1MWu/rys/4L7po6C2FNo3c4KtrOYc8wd8uu/EPJwSaGxrYysYk4Wxf/D7LES1\ndoDaiHxfA6QKh1jUk0cKcVZVhcssI/9/ijv0b4QfVj28UxK5LyJ7iybp+W/UBTnb\nMxNK5MECgYEA5NEO8MTo7lFcwUi4GSxebA9cdWz5/L7rbL/aEraaRXTOWqXobNwM\n7Bbh0g7Bzxk7qxiRcHAj1aIEo/1waWIFJx3Nv/S5gMLynX/1a4JWcWCjeSoMEBuB\nOGy+O7CfJB7AW16ouJsiaoDaKaKVxk06hGCmIqdmfPFQvS3YWqGGOq0CgYEAxTIK\nEdkR9g/iR1RmWqIu15lvGsXK/gIBLe2Y7ejPz3JK/d2k1E7NHy7kni5BlQsl30oo\nG7wgOW0buwfD6zsRKlUWQkZNxi2/sGJ1HB+oyMOOWdLGj/+XI5y4dgh3VoW+3KaU\nlInaTZCGy724e2oAjdBBSbRTQpCjMGzIrPyW9h0CgYEAlzIRJkVnCTrYCJvtkizA\nQ7UuyiT1Vu4tEFIBXkYs0GJrjHh+iZgqLcK8+xlnNVqeE+OLDvn6o8qIOHhaVDhB\n4WQPNZ0XCp9Gw43u9FhOmGJcAs8m42nZTBiG51hBABQV1QpKgJl591gnUEWvpDYZ\nyak3fkSRM1QdnrPxd4mt8Y0CgYBcf0VT6+NN7VNxq/g66TpZrUH9Z+v4y83r0jha\n2Eqp/u2IOTA42iHDT8azH/VpSQphu7ImmE7xQOmyCElxDIrXtYO0YK/YltsEjJps\nL7mHOpuKLKExKG2nqbqouv3nWuMVMxoctrDsky93YC2pziYmXxpQzUIExj2V2GEl\nK3JQTQKBgCZZCcQkC1TCcTY/jINGFg7xHansA970WmKdrRk+BaEPbufi5HWPqU0d\ngCn1xV7Cq3dUtoutEbiYyksl2Yp/QgJkL8CkXAIuj2OKPkD0lXF54dBs7ipWqgxO\nQ2fjHb9VETG7nG/H6jT/N/UuCL9erKjaLk+yclEwsw/pJ2LXhR8V\n-----END RSA PRIVATE KEY-----"

    const [authKey, setAuthKey] = useState(fakeKey);
    const [authCRT, setAuthCRT] = useState(fakeCert);
    const [brokerURL, setBrokerURL] = useState(brokerProtocol + "://" + brokerHost + ":" + brokerPort);
    const [clientID, setClientID] = useState(uuid());
    const [error, setError] = useState(null);
    const [correct, setCorrect] = useState(null);
    const [isConnected, setIsConnected] = useState(false);

    const handleCertValueChange = (event) => {
        setAuthCRT(event.target.value);
    }

    const handleKeyValueChange = (event) => {
        setAuthKey(event.target.value);
    }

    const handleBrokerURLChange = (event) => {
        setBrokerURL(event.target.value);
    }

    const handleClientIDChange = (event) => {
        setClientID(event.target.value);
    }

    const handleDisconnect = (event) => {
        postDisconnect().then(
            (response) => {
                if (response.ok) {
                    setIsConnected(false)
                    setCorrect("Successfully disconnected from broker");
                }
            }
        ).catch( error => setError(error.message))
        event.preventDefault();
    }

    const handleConnectSubmit = (event) => {
        const data = {
            "authKey": authKey,
            "authCRT": authCRT,
            "brokerURL": brokerURL,
            "clientID": clientID
        }
        postConnect(data).then(
            (response) => {
                if (response.ok) {
                    setIsConnected(true);
                    setCorrect("Successfully connected to broker")
                }else{
                    response.text().then(
                        (text) => {
                            setError(text);
                            setIsConnected(false);
                        }
                    )
                }
            }
        ).catch( error => setError(error.message));
        event.preventDefault();
    }

    return(
        <form onSubmit={handleConnectSubmit}>
            { error !== null && <AlertBar setMessage={setError} message={error} type="error"/>}
            { correct !== null && <AlertBar setMessage={setCorrect} message={correct} type="success"/>}
            <Grid container spacing={2} justify="center" alignItems="flex-end">
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Insert certificate:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Insert certificate here"
                                multiline
                                fullWidth
                                value={authCRT}
                                rows={10}
                                onChange={handleCertValueChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={6}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                Insert private key:
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Insert private key here"
                                multiline
                                fullWidth
                                value={authKey}
                                rows={10}
                                onChange={handleKeyValueChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12}>
                    <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Insert Broker URL:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Insert Client ID:
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Insert Broker URL here"
                                value={brokerURL}
                                fullWidth
                                onChange={handleBrokerURLChange}
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                label="Insert Client ID here"
                                value={clientID}
                                fullWidth
                                onChange={handleClientIDChange}
                            />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth disabled={isConnected} type="submit" variant="contained" color="primary">
                        Connect
                    </Button>
                </Grid>
                <Grid item xs={3}>
                    <Button fullWidth type="button" disabled={!isConnected} color="secondary" onClick={handleDisconnect} variant="contained">
                        Disconnect
                    </Button>
                </Grid>
            </Grid>        
        </form>
    )
}