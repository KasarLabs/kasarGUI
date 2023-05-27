import { useConnectors, useAccount } from "@starknet-react/core";
import { Button } from './s-components/Buttons';
import MetaMaskSDK from '@metamask/sdk';
import { useEffect, useState } from "react";

function ButtonConnect() {
  const { connect, connectors, disconnect } = useConnectors()
  const { account, address, status } = useAccount()
  const [ethereumAccount, setEthereumAccount] = useState<string | null>(null);

  const options = {
    injectProvider: false,
    communicationLayerPreference: 'webrtc',
  };

  // const MMSDK = new MetaMaskSDK(options);
  // const ethereum = MMSDK.getProvider();

  interface ConnectInfo {
    chainId: string;
  }
  // const onClickButton = () => {

  //   ethereum?.request({
  //     method: "eth_requestAccounts",
  //   })
  //     .then((accounts: string[]) => {
  //       setEthereumAccount(accounts[0]);
  //     })
  //     .catch((error: any) => {
  //       alert(`Something went wrong: ${error}`);
  //     });

  //   const hello = ethereum?.isConnected();
  //   console.log(hello)
  //   console.log(ethereumAccount)

  // }

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      console.log('MetaMask is installed!');
    } else {
      console.log('heyyy')
    }
  }, [])
  return (
    <>
      {/* {status === 'disconnected' ? (
        <>
          {
            connectors.map((connector) => (
              <Button key={connector.id()} onClick={() => connect(connector)}>
                Connect Wallet
              </Button>
            ))
          }
        </>
      ) : (
        <>
          <Button onClick={() => disconnect()}>
            {address?.substring(0, 7)}{'...'}{address?.slice(-3)}
          </Button>
        </>
      )} */}
      {/* <button onClick={onClickButton}>connect</button> */}
    </>
  )
}

export default ButtonConnect