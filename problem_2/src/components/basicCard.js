import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


export default function BasicCard() {
    return (
        <Card sx={{ minWidth: 275, boxShadow: 0}}>
            <CardContent>
                <Typography variant="h5" component="div">
                    Transaction History
                </Typography>
                <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    View all transactions here
                </Typography>
            </CardContent>
        </Card>
    );
}