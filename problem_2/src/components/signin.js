import React, {useEffect, useState} from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import {createTheme, ThemeProvider} from '@mui/material/styles';
import TransactionHistory from "./history";
import DataTable from "./table";
import {padTo2Digits, unixToDateTime, timeDifference} from "../helper/datetime.js";
import {randomHashGenerator} from "../helper/contract";

// function Copyright(props) {
//     return (
//         <Typography variant="body2" color="text.secondary" align="center" {...props}>
//             {'Copyright © '}
//             <Link color="inherit" href="https://mui.com/">
//                 Your Website
//             </Link>{' '}
//             {new Date().getFullYear()}
//             {'.'}
//         </Typography>
//     );
// }

const theme = createTheme();

export default function SignInSide() {
    const columns = [
        {field: 'txnHash', headerName: 'Txn Hash', width: 210},
        {
            field: 'date',
            headerName: 'date',
            type: 'date',
            width: 220,
            valueFormatter: (params) => {
                // first converts to JS Date, then to locale option through date-fns
                return params.value;
            },
            valueGetter: (params) => {
                // new Date(params.value).toLocaleDateString('en-US');

                return unixToDateTime(params.value)[1]
            }
        },
        {
            field: 'age',
            headerName: 'age',
            description: 'This column has a value getter and is not sortable.',
            sortable: false,
            width: 130,
            valueGetter: (params) => {
                return timeDifference(Date.now(), params.value)
            }
        },
        {field: 'to', headerName: 'To', width: 210},
        {field: 'amount', type: 'number', headerName: 'amount', width: 70},
    ];


    const [rows, setRows] = useState([
        {
            id: 1,
            txnHash: randomHashGenerator(),
            date: 1652002362222,
            age: 1652002362222,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 2,
            txnHash: randomHashGenerator(),
            date: 1651002362333,
            age: 1651002362333,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 3,
            txnHash: randomHashGenerator(),
            date: 1658002362234,
            age: 1658002362234,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 4,
            txnHash: randomHashGenerator(),
            date: 1655002334554,
            age: 1655002334554,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 5,
            txnHash: randomHashGenerator(),
            date: 1656002398735,
            age: 1656002398735,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 6,
            txnHash: randomHashGenerator(),
            date: 165700234342,
            age: 165700234342,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 7,
            txnHash: randomHashGenerator(),
            date: 165700234342,
            age: 165700234342,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 8,
            txnHash: randomHashGenerator(),
            date: 1649002362850,
            age: 1649002362850,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
        {
            id: 9,
            txnHash: randomHashGenerator(),
            date: 1658002362850,
            age: 1658002362850,
            to: '0x8399d6351fd0ddb33f77bfc627e3264d74500d22',
            amount: 35,
        },
    ])

    let rowsNcol = {
        rows,
        columns
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        const data = {
            id: Date.now(),
            txnHash: randomHashGenerator(),
            date: Date.now(),
            age: Date.now(),
            to: formData.get('address'),
            amount: formData.get('amount')
        }

        setRows(oldRows => [...oldRows, data])

        console.log(rowsNcol);
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
                        <Avatar sx={{m: 1, bgcolor: 'secondary.main'}}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            FancyForm
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{mt: 1}}>
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                id="address"
                                label="Destination address"
                                name="address"
                                autoFocus
                            />
                            <TextField
                                margin="normal"
                                required
                                fullWidth
                                name="amount"
                                label="Amount"
                                type="amount"
                                id="amount"
                            />
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
                    {/*<TransactionHistory components={components}/>*/}
                    <DataTable rowsNcol={rowsNcol}/>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
}