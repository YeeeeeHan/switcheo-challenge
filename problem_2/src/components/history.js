import * as React from 'react';
import {styled} from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import BasicCard from "./txncard";
import {Container} from "@mui/material";

const Item = styled(Paper)(({theme}) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#ffffff' : '#888888',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
}));

export default function TransactionHistory({components}) {
    return (
        <Box sx={{width: '100%'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={12} rowSpacing={1}>
                    {components.slice(0).reverse().map((comp, i) => {
                        return (
                            <div key={i}>
                                <br />
                                <Container>
                                    <BasicCard comp={comp}/>
                                </Container>
                            </div>
                        )
                    })}
                </Grid>
            </Grid>
        </Box>
    );
}