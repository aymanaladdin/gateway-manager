import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GatewayDetails } from "../components/GatewayDetails";
import gatewayService from "../lib/gateway.service";
import { Gateway } from "../lib/types";

export const GatewayItem = () => {
  const {serial} = useParams();
  const [gateway, setGateway] = useState<Gateway>()

  useEffect(() => {
    if(serial) {
      gatewayService.getDetails(serial)
        .then(gateway => { 
          gateway.devices = gateway.devices.map((device, index) => ({...device, id: index + 1})) 
          setGateway(gateway)
         })
        .catch(err => {
          console.log('error loading gateways', err)
        })
    }
  }, [])

  return (gateway ? <GatewayDetails gateway={gateway}/>: <Skeleton animation="wave" />)
}