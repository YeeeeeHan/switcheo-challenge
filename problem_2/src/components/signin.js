import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import SentimentVeryDissatisfiedSharpIcon from '@mui/icons-material/SentimentVeryDissatisfiedSharp';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import DataTable from "./table";
import {randomHashGenerator} from "../helper/contract";
import {validateAddress, validateAmount,} from "../helper/validate"
import {ClickAwayListener, Container} from "@mui/material";
import {sampleColumns, sampleRows} from "../helper/sampleData"
import BasicCard from "./txncard";


const theme = createTheme();



export default function SignInSide() {

    // Populate with sample data
    const [rows, setRows] = useState(sampleRows)
    let rowsNcol = {
        rows: rows,
        columns: sampleColumns
    }


    // Called when submit button is clicked
    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);

        if (!handleValidate(formData)) {
            return
        }

        const data = {
            id: Date.now(),
            txnHash: randomHashGenerator(),
            date: Date.now(),
            age: Date.now(),
            to: formData.get('address'),
            amount: formData.get('amount')
        }

        setRows(oldRows => [...oldRows, data])

    };

    // Form submission validation
    const handleValidate = (formData) => {
        if (validateAddress(formData.get('address')) !== "") {
            alert('Address: ' + validateAddress(formData.get('address')))
            return false
        }

        if (validateAmount(formData.get('amount')) !== "") {
            alert('Amount: ' + validateAmount(formData.get('amount')))
            return false
        }
        return true
    }


    // Handles and stored all form in put changes
    const [inputs, setInputs] = useState({address: "", amount: -1});
    const [err, setErr] = useState({address: false, addressMsg: "", amount: false, amountMsg: ""})

    // Input clickaway validation
    const handleClickAwayAddress = () => {
        if (validateAddress(inputs.address) !== "") {
            setErr({...err, address: true, addressMsg: validateAddress(inputs.address)})
            return
        }

        setErr({...err, address: false, addressMsg: ""})
    };
    const handleClickAwayAmount = () => {
        console.log(inputs.amount)
        if (validateAmount(inputs.amount) !== "") {
            setErr({...err, amount: true, amountMsg: validateAmount(inputs.amount)})
            return
        }

        setErr({...err, amount: false, amountMsg: ""})
    };


    return (
        <ThemeProvider theme={theme}>
            <Grid container component="main" sx={{height: '100vh'}}>
                <CssBaseline/>
                <Grid item xs={12} sm={6} md={4} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Avatar sx={{m: 2, bgcolor: 'primary.main'}}>
                            <SentimentVeryDissatisfiedSharpIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            FancyForm
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <ClickAwayListener onClickAway={handleClickAwayAddress}>
                                <TextField
                                    error={err.address}
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="address"
                                    label="Destination address"
                                    name="address"
                                    helperText={err.address ? err.addressMsg : ""}
                                    onChange={e => {setInputs({...inputs, address: e.target.value});handleClickAwayAddress();}}
                                    autoFocus
                                />
                            </ClickAwayListener>
                            <ClickAwayListener onClickAway={handleClickAwayAmount}>
                                <TextField
                                    error={err.amount}
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="amount"
                                    label="Amount"
                                    type="number"
                                    id="amount"
                                    helperText={err.amount ? err.amountMsg : ""}
                                    onChange={e => {setInputs({...inputs, amount: parseInt(e.target.value, 10)});handleClickAwayAmount();}}
                                />
                            </ClickAwayListener>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="otp"
                                label="OTP authentication"
                                type="otp"
                                id="otp"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                sx={{mt: 3, mb: 2}}
                            >
                                Send Tokens
                            </Button>
                            <Grid container>
                            </Grid>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={false} sm={6} md={8}>
                    <br/>
                    <Container>
                        <BasicCard/>
                    </Container>
                    <DataTable rowsNcol={rowsNcol}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}