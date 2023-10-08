import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {Auth0Provider} from '@auth0/auth0-react';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
    domain="dev-03sbejzb12rjytco.us.auth0.com"
    clientId="GzTfOnvvzpnMSKkYuTOckrffBIVTxitd"
    authorizationParams={{
      redirect_uri:"https://real-estate-cujo.vercel.app/"
      
    }}
      audience="http://localhost:4000"
       scope="openid profile email"
       >
    
     <App/>
    </Auth0Provider>
   
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

