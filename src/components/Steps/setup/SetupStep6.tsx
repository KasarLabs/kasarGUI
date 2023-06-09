import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray, TextGraySM } from '../../s-components/Texts'
import styled, { keyframes } from 'styled-components'
import { useEffect, useState } from 'react'
import confetti from 'canvas-confetti'
import { GradientText, Separator, SeparatorSM } from '@/components/s-components/utils'
import axios from 'axios'
import { SERVER_NODE_API } from '@/constants'
import { TailSpin } from 'react-loader-spinner'
import { IJson } from '@/App'
import { SpaceBetween } from '@/components/s-components/Flex'
import { shell } from 'electron'
import { AiFillWarning } from 'react-icons/ai';


const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    p {
      text-align: center;
    }
`;

const animateBar = keyframes`
    from {
      background-position: 100% 0;
    }
    to {
      background-position: 0% 0;
    }
`;

const ProgressBar = styled.ul`
  counter-reset: step;

  li {
      list-style: none;
      display: inline-block;
      width: 16.6%;
      position: relative;
      text-align: center;
      cursor: pointer;
      font-family: 'Inter';
      &:before {
          content: counter(step);
          counter-increment: step;
          width: 30px;
          height: 30px;
          line-height: 30px;
          border: 2px solid #ddd;
          border-radius: 100%;
          display: block;
          text-align: center;
          background-color: #fff;
      }

      &:after {
          content: "";
          position: absolute;
          width: 100%;
          height: 2px;
          background-color: #ddd;
          top: 15px;
          left: -60%;
          z-index: -1;
      }

      &:first-child:after {
          content: none;
      }

      &.active {
          color: #2962D2;

          &:before {
              border-color: #2962D2;
          }
      }

      &.active + li:after {
          background: linear-gradient(90deg, transparent, #2962D2, transparent);
          background-size: 200% 100%;
          animation: ${animateBar} 5s linear infinite; /* 2s duration, linear speed, infinite loop */
      }
  }
`;

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Flex = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`

const Row = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  p {
  text-align: center;
}
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
  const [stateNode, setStateNode] = useState('Created')
  const [activeState, setActiveState] = useState(0)


  const [l2sync, setL2Sync] = useState()

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const callNode = async () => {
      const { data } = await axios.get(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`);
      if (data.length) {
        setLoading(false);
        setNodes(data);
      }
    };
    callNode()
    intervalId = setInterval(callNode, 5000); // Call the API every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    const getSync = async () => {
      //@ts-ignore
      const index = String(nodes[nodes.length - 1].ID)
      const { data } = await axios.get(`${SERVER_NODE_API}/node/L2/get?node_id=${index}&provider_id=${uuid}`);
      setL2Sync(data)
      if (data.Block > 0) {
        clearInterval(intervalId); // Stop calling the API once data is not empty
      }
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

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    function getObjectWithGreatestID(objects: any[]): any | undefined {
      if (objects.length === 0) {
        return undefined;
      }

      let maxObject: any = objects[0]; // Assume first object has the greatest ID

      for (let i = 1; i < objects.length; i++) {
        const currentObject = objects[i];

        if (currentObject.ID > maxObject.ID) {
          maxObject = currentObject;
        }
      }

      return maxObject;
    }

    const callState = async () => {
      if (nodes) {
        const index = getObjectWithGreatestID(nodes);
        const { data } = await axios.get(`${SERVER_NODE_API}/node/getInfos?node_id=${index?.ID}&provider_id=${uuid}`);
        setStateNode(data?.Node?.State);
      }
    };
    callState()
    intervalId = setInterval(callState, 5000); // Call the API every 5 seconds
    return () => clearInterval(intervalId); // Clean up the interval on unmount
  }, [nodes])

  useEffect(() => {
    const getActiveState = () => {
      switch (stateNode) {
        case 'Created':
          return 0;
        case 'Install Tools':
          return 1;
        case 'Download Mainnet':
          return 2;
        case 'Unzip Mainnet':
          return 3;
        case 'Starting':
          return 5;
        case 'Run':
          return 6;
        default:
          return 0;
      }
    }
    const res = getActiveState()
    setActiveState(res)
  }, [stateNode])
  console.log(stateNode)
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Fetching your <Gradient>node</Gradient></H1>



          <Text>Please wait, synchronization is in progress...<br />
            {!loading &&
              <span>
                <GradientText>{jsonData?.name}</GradientText> Starknode syncing on Starknet mainnet using {jsonData?.client}. Syncing on block:
              </span>
            }
          </Text>
        </Row>
        <Separator />
        <Row>
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
        </Row>
        <Row>
          {!loading &&
            <>
              {
                //@ts-ignore
                l2sync?.Block > 0 ?
                  //@ts-ignore
                  <Text style={{ fontSize: '50px' }}> <Gradient>{l2sync?.Block}</Gradient> </Text>
                  :
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
            </>
          }
        </Row>
      </Rows>

      <Separator />
      <Container>
        {stateNode === 'Created' &&
          <TextGray>state: node created</TextGray>
        }
        {stateNode === 'Install Tools' &&
          <TextGray>state: installing tools</TextGray>
        }
        {stateNode === 'Download Mainnet' &&
          <TextGray>state: download mainnet</TextGray>
        }
        {stateNode === 'Unzip Mainnet' &&
          <TextGray>state: unzip mainnet</TextGray>
        }
        {stateNode === 'Starting' &&
          <TextGray>state: starting</TextGray>
        }
        {stateNode === 'Run' &&
          <TextGray>state: Run</TextGray>
        }

        <ProgressBar>
          <li className='active'></li>
          <li className={activeState >= 1 ? 'active' : ''}></li>
          <li className={activeState >= 2 ? 'active' : ''}></li>
          <li className={activeState >= 3 ? 'active' : ''}></li>
          <li className={activeState >= 5 ? 'active' : ''}></li>
          <li className={activeState >= 6 ? 'active' : ''}></li>
        </ProgressBar>
      </Container>
      <Flex>
        <AiFillWarning />
        <TextGray style={{ fontSize: "10px" }}>This could take some time, you can exit this app and track your node.</TextGray>
      </Flex>
      <SeparatorSM />
      <SpaceBetween>
        <div />
        {/* <ButtonSmall style={{ fontSize: '16px' }} onClick={() => nextStep(7)}>Query (advanced)</ButtonSmall> */}
        <ButtonSmall onClick={() => shell.openExternal('https://app.kasar.io')}>Track</ButtonSmall>
      </SpaceBetween>
    </Card>
  )
}

export default Step6