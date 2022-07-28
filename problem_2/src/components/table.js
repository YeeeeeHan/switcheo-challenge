import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Container} from "@mui/material";


export default function DataTable({rowsNcol}) {
    return (
        <Box sx={{width: '100%'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={12} rowSpacing={1}>
                    <Container>
                        <div style={{ height: 580, width: '100%' }}>
                            <DataGrid
                                animateRows={true}
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'date', sort: 'desc' }],
                                    },
                                }}
                                rows={rowsNcol.rows}
                                columns={rowsNcol.columns}
                                pageSize={11}
                                rowsPerPageOptions={[11]}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </Box>

    );
}