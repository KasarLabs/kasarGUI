import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './samples/node-api'
import './styles/index.scss'
import { StarknetConfig, InjectedConnector } from '@starknet-react/core'
import { MetaMaskProvider } from './hooks/useMetamask'

const connectors = [
  new InjectedConnector({ options: { id: 'argentX' } }),
]
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(

  <React.StrictMode>
    {/* <MetaMaskProvider> */}
    {/* <StarknetConfig connectors={connectors}> */}
    <App />
    {/* </StarknetConfig > */}
    {/* </MetaMaskProvider> */}
  </React.StrictMode>,
)

postMessage({ payload: 'removeLoading' }, '*')
