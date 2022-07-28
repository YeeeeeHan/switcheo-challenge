import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import {Container} from "@mui/material";
import BasicCard from "./txncard";


export default function DataTable({rowsNcol}) {
    return (
        <Box sx={{width: '100%'}}>
            <Grid container rowSpacing={1} columnSpacing={{xs: 1, sm: 2, md: 3}}>
                <Grid item xs={12} rowSpacing={1}>
                    <Container>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                initialState={{
                                    sorting: {
                                        sortModel: [{ field: 'date', sort: 'desc' }],
                                    },
                                }}
                                rows={rowsNcol.rows}
                                columns={rowsNcol.columns}
                                pageSize={7}
                                rowsPerPageOptions={[7]}
                            />
                        </div>
                    </Container>
                </Grid>
            </Grid>
        </Box>

    );
}