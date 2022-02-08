import { Skeleton } from "@mui/material";
import { useEffect, useState } from "react";
import { GatewayList } from "../components/GatewayList";
import gatewayService from "../lib/gateway.service";
import { Gateway } from "../lib/types";

export const GatewayItems = () => {
  const [gateways, setGateways] = useState<Gateway[]>()

  useEffect(() => {
    gatewayService.getAll()
      .then(gateways => { setGateways(gateways.map((gateway, index) => ({...gateway, id: index + 1}))) })
      .catch(err => {
        console.log('error loading gateways', err)
      })
  }, [])

  return (gateways? <GatewayList gateways={gateways}/>: <Skeleton animation="wave" />)
}