import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { GatewayItems } from './routes/GatewayItems';
import { GatewayItem } from './routes/GatewayItem';

import './index.css';

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
          <Route path="/gateways" element={<GatewayItems />}/>
          <Route path="/gateways/:serial" element={<GatewayItem />} />
          <Route path="*" element={<Navigate to="/gateways"/>} />
      </Routes>    
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
