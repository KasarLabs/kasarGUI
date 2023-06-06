


import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray, TextGraySM } from '../../s-components/Texts'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { Separator, SeparatorSM } from '@/components/s-components/utils'
import axios from 'axios'
import { SERVER_NODE_API } from '@/constants'
import { TailSpin } from 'react-loader-spinner'
import { IJson } from '@/App'

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  p {
    text-align: center;
  }
`

const DisplayNode = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  box-shadow: 0px 2px 6px 2px rgba(0, 0, 0, 0.25);
  padding: 10px;
  border-radius: 5px;
p{
margin: 0;
}
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
  uuid: string;
  jsonData: IJson | undefined;
}

function Step6({ nextStep, previousStep, uuid, jsonData }: PreviousStepProps) {
  const [loading, setLoading] = useState(true)
  const [nodes, setNodes] = useState([])
  const [l1sync, setL1Sync] = useState()


  useEffect(() => {
    const callNode = async () => {
      const { data } = await axios.get(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`);
      console.log('getAllOf', data);
      if (data.length) {
        setLoading(false);
        setNodes(data);
      }
    };

    const createNode = async () => {
      try {
        const { data } = await axios.post(`${SERVER_NODE_API}/node/create`, {
          ProviderId: jsonData?.token,
          RPC: jsonData?.rpc_key
        });
        callNode();

      } catch (err) {
        console.log(err)
      }
    }
    createNode()
  }, [])

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;
  //   const callNode = async () => {
  //     const { data } = await axios.get(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`);
  //     console.log('getAllOf', data);
  //     if (data.length) {
  //       clearInterval(intervalId); // Stop calling the API once data is not empty
  //       setLoading(false);
  //       setNodes(data);
  //     }
  //   };
  //   setLoading(true);
  //   callNode();
  //   intervalId = setInterval(callNode, 5000); // Call the API every 5 seconds
  //   return () => clearInterval(intervalId); // Clean up the interval on unmount
  // }, []);



  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const getSync = async () => {
      const { data } = await axios.get(`${SERVER_NODE_API}/node/L1/get?node_id=${String(nodes[0].ID)}&provider_id=${uuid}`);
      setL1Sync(data)
      if (data.SyncTime > 0) {
        clearInterval(intervalId); // Stop calling the API once data is not empty
      }
      console.log('L1GetHandler', data);
    }
    getSync()
    intervalId = setInterval(getSync, 5000); // Call the API every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [nodes])

  useEffect(() => {
    if (!loading) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  }, [loading])
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Fetching your <Gradient>node</Gradient></H1>
          <Text>Please wait, synchronization is in progress...</Text>
        </Row>
        <Separator />
        {loading &&
          <TailSpin
            height="100"
            width="100"
            color="#000"
            ariaLabel="tail-spin-loading"
            radius="2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
          />
        }
        {!loading &&
          <>
            <Text>My node:</Text>
            <SeparatorSM />
            <Text>
              "{jsonData?.name}" Starknode syncing Starknet mainnet using {jsonData?.client}.<br />
            </Text>
            <Text style={{ display: 'flex', gap: '10px' }}>
              Syncing on block: {l1sync?.SyncTime > 0 ? <>{l1sync?.SyncTime}</> : <><TailSpin
                height="25"
                width="25"
                color="#000"
                ariaLabel="tail-spin-loading"
                radius="2"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
              /></>}
            </Text>
          </>
        }
        <Separator />
        <ButtonSmall onClick={() => nextStep(-1)}>Home</ButtonSmall>
      </Rows>
    </Card>
  )
}

export default Step6

{/* {nodes && nodes.map((node, index) => {
                return (
                  <div key={index}>
                    <p>Node {index + 1}</p>
                    <p>RPC: {node.RPC}</p>
                    <p>Block: {node.L2.Block}</p>
                  </div>
                )
              })} */}