import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Alert, Button, Chip, Grid, List, ListItem, Snackbar, Typography } from '@mui/material';
import { DataGrid, GridActionsCellItem, GridColumns, GridRenderCellParams, GridRowParams, GridValueGetterParams } from '@mui/x-data-grid';
import { ArrowBackRounded, DeleteRounded } from '@mui/icons-material';
import { Device, DeviceStatus } from '../lib/types';
import { AddDevice } from './AddDevice';
import deviceService from '../lib/device.service';

export const GatewayDetails = ({ gateway }: any) => {
  const [action, setAction] = useState(0)
  const [devices, setDevices] = useState(gateway.devices ?? []);
  const [addDeviceOpened, setAddDeviceOpened] = useState(false);

  const deleteDevice = (uid: number) => {
    deviceService.removeGatewayDevice(gateway.serial, uid)
      .then(_ => {
        setAction(1)
        setDevices((prevDevices: Device[]) => (prevDevices.filter(device => device.uid !== uid)))
      })
      .catch(error => {
        setAction(2)
      })
  }

  const addDevice = (device: Device) => {
    setDevices((devices: Device[]) => [...devices, device])

    setAddDeviceOpened(false)
  }

  const columns: GridColumns = [
    { field: 'uid', headerName: 'Unique ID', minWidth: 250 },
    { field: 'vendor', headerName: 'Vendor', minWidth: 200 },
    {
      field: 'status', headerName: 'Status',
      minWidth: 200,
      renderCell: ({ value }: GridRenderCellParams<String>) => (
        <Chip label={value} color={value === DeviceStatus.ONLINE ? "success" : "default"} size="small" />
      ),
    },
    {
      field: 'createdAt', headerName: 'Created Date',
      type: 'dateTime', minWidth: 250,
      valueGetter: ({ row }: GridValueGetterParams) => (row.createdAt ? new Date(row.createdAt) : row.createdAt)
    },
    {
      field: 'actions',
      headerName: 'Actions',
      type: 'actions',
      minWidth: 200,
      getActions: ({ row }: GridRowParams) => [
        <GridActionsCellItem icon={<DeleteRounded />} label="View Details" onClick={() => deleteDevice(row.uid)} />
      ],
    },
  ];

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') return;

    setAction(0);
  };

  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      p={4}
      mx={'5%'}
      my={'2%'}
      style={{ backgroundColor: 'white', height: 800, width: '90%' }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', marginBottom: '48px' }}>
        <Link to="/gateways"><Button startIcon={<ArrowBackRounded />} /></Link>

        <Typography variant="h2" gutterBottom component="div">
          {gateway.name}
        </Typography>

        <Button disabled={devices.length === 10} variant="contained" onClick={() => setAddDeviceOpened(true)}>Add Device</Button>
      </div>

        {
          devices.length === 10 ?
            <Alert severity="warning">
              This gateway reaches max number of peripheral devices!
            </Alert> : <></>
        }
      <div style={{ display: "flex", width: '100%' }}>
        <List>
          <ListItem>
            <Typography variant='h6' pr={2}> Serial: </Typography>
            <Typography variant='body1'> {gateway.serial} </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' pr={2}> IP: </Typography>
            <Typography variant='body1'> {gateway.ip} </Typography>
          </ListItem>
          <ListItem>
            <Typography variant='h6' pr={2}> Devices: </Typography>
          </ListItem>
        </List>
      </div>

      <DataGrid style={{ height: 400, width: '100%', display: 'flex', justifySelf: 'center' }}
        rows={devices}
        getRowId={(row: any) => row.uid}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
      />

      <Snackbar open={action === 1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Device removed successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={action === 2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to remove device, please try again later!
        </Alert>
      </Snackbar>

      <AddDevice
        serial={gateway.serial}
        isOpen={addDeviceOpened}
        handleSuccess={addDevice}
        handleClose={() => setAddDeviceOpened(false)}
      />
    </Grid>
  );
}