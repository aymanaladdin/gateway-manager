import { Alert, Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, FormControlLabel, FormGroup, FormLabel, Snackbar, Switch, TextField, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import deviceService from "../lib/device.service"
import { DeviceStatus } from "../lib/types"

export const AddDevice = ({ serial, isOpen, handleClose, handleSuccess }: any) => {
  const [vendor, setVendor] = useState('')
  const [status, setStatus] = useState(DeviceStatus.OFFLINE)
  const [vendorError, setVendorError] = useState(false)
  const [loading, setLoading] = useState(false)
  const [action, setAction] = useState(0)

  useEffect(() => {
    if (!isOpen) {
      setVendor('')
      setVendorError(false)
      setStatus(DeviceStatus.OFFLINE)
      setLoading(false)
      setAction(0)
    }
  }, [isOpen])

  const submit = () => {
    setVendorError(!vendor.length)

    if (vendor.length) {
      setLoading(true)

      deviceService.addGatewayDevice(serial, { status, vendor })
        .then((device) => {
          setAction(1)
          handleSuccess(device)
        })
        .catch(error => {
          setAction(2)
        })
    }
  }

  const toggleStatus = (event: any) => {
    setStatus(event.target.checked ? DeviceStatus.ONLINE : DeviceStatus.OFFLINE)
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">
        Add Device
      </DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            '& > :not(style)': { m: 1, width: '500px' },
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            required
            error={vendorError}
            id="outlined-vendor"
            label="Device Vendor"
            placeholder="Enter device vendor"
            name="vendor"
            variant="standard"
            helperText={vendorError ? "Device vendor is required" : ""}
            onChange={(event) => setVendor(event.target.value?.trim())}
          />

          <FormControl component="fieldset" variant="standard" style={{ marginTop: '16px' }}>
            <FormLabel component="legend">Status</FormLabel>
            <FormGroup>
              <FormControlLabel
                control={<Switch checked={status === DeviceStatus.ONLINE} onChange={toggleStatus} />}
                label="Online"
              />
            </FormGroup>
          </FormControl>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose}>Dismiss</Button>
        <Button disabled={loading} onClick={submit}>Submit</Button>
      </DialogActions>

      <Snackbar open={action === 1} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          Device added successfully!
        </Alert>
      </Snackbar>

      <Snackbar open={action === 2} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
          Failed to add device, please try again later!
        </Alert>
      </Snackbar>
    </Dialog>
  )
}