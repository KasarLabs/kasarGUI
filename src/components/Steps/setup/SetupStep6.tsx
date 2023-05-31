


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
  align-items: center;
  justify-content: center;
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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;
    const callNode = async () => {
      const { data } = await axios.get(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`);
      console.log(data);
      if (data.length) {
        clearInterval(intervalId); // Stop calling the API once data is not empty
        setLoading(false);
        setNodes(data);
      }
    };
    setLoading(true);
    callNode();
    intervalId = setInterval(callNode, 5000); // Call the API every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [uuid]);

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
              Syncing on block: {nodes[0]?.L2?.Block}
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