


import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { Separator, SeparatorSM } from '@/components/s-components/utils'
import axios from 'axios'
import { SERVER_NODE_API } from '@/constants'
import { TailSpin } from 'react-loader-spinner'

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
}

function Step6({ nextStep, previousStep, uuid }: PreviousStepProps) {
  const [loading, setLoading] = useState(false)
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

  return (
    <Card>
      <Rows>
        <Row>
          <H1>Fetching your node(s)</H1>
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
            <Text>My nodes:</Text>
            <SeparatorSM />
            <DisplayNode>
              {nodes && nodes.map((node, index) => {
                return (
                  <>
                    <p>Node {index + 1}</p>
                    <p>RPC: {node.RPC}</p>
                    <p>Block: {node.L2.Block}</p>
                  </>
                )
              })}
            </DisplayNode>
          </>
        }
        {/* <Inputs>
          <ButtonSmall onClick={() => nextStep(-1)}>Home</ButtonSmall>
        </Inputs> */}
      </Rows>
    </Card>
  )
}

export default Step6