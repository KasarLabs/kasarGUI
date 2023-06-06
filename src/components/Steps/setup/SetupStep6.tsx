


import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray, TextGraySM } from '../../s-components/Texts'
import styled, { css } from 'styled-components'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { GradientText, Separator, SeparatorSM } from '@/components/s-components/utils'
import axios from 'axios'
import { SERVER_NODE_API } from '@/constants'
import { TailSpin } from 'react-loader-spinner'
import { IJson } from '@/App'


const ScrollBar = css`
  width: 10px;
`;

const ScrollBarTrack = css`
  background: #f1f1f1;
`;

const ScrollBarThumb = css`
  background: #888;
border-radius: 10px;
`;

const ScrollBarThumbHover = css`
  background: #555;
`;
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
  max-height: 400px;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    ${ScrollBar}
  }
  
  &::-webkit-scrollbar-track {
    ${ScrollBarTrack}
  }
  
  &::-webkit-scrollbar-thumb {
    ${ScrollBarThumb}
  }
  
  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    ${ScrollBarThumbHover}
  }
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
    let intervalId: NodeJS.Timeout;

    const callNode = async () => {
      const { data } = await axios.get(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`);
      console.log('getAllOf', data);
      if (data.length) {
        setLoading(false);
        setNodes(data);
      }
    };

    callNode()
    intervalId = setInterval(callNode, 5000); // Call the API every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [])

  // useEffect(() => {
  //   let intervalId: NodeJS.Timeout;

  //   const getSync = async () => {
  //     const { data } = await axios.get(`${SERVER_NODE_API}/node/L1/get?node_id=${String(nodes[0].ID)}&provider_id=${uuid}`);
  //     setL1Sync(data)
  //     if (data.SyncTime > 0) {
  //       clearInterval(intervalId); // Stop calling the API once data is not empty
  //     }
  //     console.log('L1GetHandler', data);
  //   }
  //   getSync()
  //   intervalId = setInterval(getSync, 5000); // Call the API every 5 seconds
  //   return () => clearInterval(intervalId); // Clean up the interval on unmount
  // }, [nodes])

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
            <Text>
              <GradientText>{jsonData?.name}</GradientText> Starknode syncing on Starknet mainnet using {jsonData?.client}.<br />
            </Text>
            <SeparatorSM />
            <DisplayNode>
              {nodes && nodes.map((node, index) => {
                // const getSync = async () => {
                //   const { data } = await axios.get(`${SERVER_NODE_API}/node/L1/get?node_id=${index}&provider_id=${uuid}`);
                //   setL1Sync(data)
                //   console.log('L1GetHandler', data);
                // }
                // getSync()
                // console.log(l1sync)
                return (
                  <div key={node.ID}>
                    <Text style={{ fontSize: "12px" }}>ID: {node.ID}</Text>
                    <Text style={{ fontSize: "12px" }}>RPC: {node.RPC}</Text>
                  </div>
                )
              })
              }
            </DisplayNode>
            {/* <Text style={{ display: 'flex', gap: '10px' }}>
              Syncing on block: {l1sync?.SyncTime > 0 ? <>{l1sync?.SyncTime}</>
                :
                <TailSpin
                  height="25"
                  width="25"
                  color="#000"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              }
            </Text> */}
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