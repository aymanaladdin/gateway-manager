import { Grid, Typography } from '@mui/material';
import LaunchRoundedIcon from '@mui/icons-material/LaunchRounded';
import { DataGrid, GridActionsCellItem, GridColumns, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';

export const GatewayList = ({gateways}: any) => {
  const navigate = useNavigate()

  const columns: GridColumns = [
    { field: 'serial', headerName: 'Serial No.', minWidth: 250, },
    { field: 'name', headerName: 'Display Name', minWidth: 250, },
    { field: 'ip', headerName: 'IP Address', minWidth: 200, },
    { 
      field: 'devices',headerName: 'Devices Count', 
      type: 'number', minWidth: 200, 
      valueGetter: ({row}: GridValueGetterParams) => (row?.devices?.length)
     },
    { 
      field: 'createdAt',headerName: 'Created Date',
      type: 'dateTime', minWidth: 250, 
      valueGetter: ({row}: GridValueGetterParams) => (row.createdAt ? new Date(row.createdAt) : row.createdAt)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      minWidth: 200,
      getActions: ({row}: GridRowParams) => [
        <GridActionsCellItem icon={<LaunchRoundedIcon/>} label="View Details" onClick={() => {  navigate(`${row.serial}`) }}/>
      ],
    },
  ];


  return (
    <Grid 
      container
      direction="column" 
      justifyContent="center" 
      alignItems="center" 
      p={4}
      mx={'5%'}
      my={'2%'} 
      style={{ backgroundColor: 'white', height: 850, width: '90%' }}
    >
      <Typography variant="h2" gutterBottom component="div" mb={8}>
        Gateways
      </Typography>

      <DataGrid style={{ height: 750, width: '100%', display: 'flex', justifySelf: 'center'}}
        rows={gateways}
        getRowId={(row: any) => row.serial}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[5]}
        />
  </Grid>
  );
}