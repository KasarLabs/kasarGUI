


import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'
import { useEffect } from 'react'
import confetti from 'canvas-confetti'
import { Separator } from '@/components/s-components/utils'
import axios from 'axios'
import { SERVER_NODE_API } from '@/constants'
import { useState } from 'react'
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

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function Step8({ nextStep, previousStep }: PreviousStepProps) {
  const [loading, setLoading] = useState(true)
  const [IP, setIP] = useState('')


  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip + ':9545');
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
  console.log(IP)

  // curl - X POST \
  // -H "Content-Type: application/json" \
  // --data '{"jsonrpc":"2.0","method":"starknet_blockNumber","params":[],"id":1}' \
  // http://192.168.1.74:9545/

  useEffect(() => {
    const queryIP = async () => {
      const response = await axios.post(
        'http://192.168.1.74:9545/',
        {
          'jsonrpc': '2.0',
          'method': 'starknet_blockNumber',
          'params': [],
          'id': 1
        },
        {
          headers: {
            'Content-Type': 'application/json'
          }
        }
      );
      console.log(response)
      //une fois le call réussi => confetti: your RPC has been successfuly exposed at url:
      //mettre IP dans box copié collable
      //Puis afficher bouton Track
    }
    queryIP()
  }, [])
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Query you <Gradient>Starknode</Gradient></H1>
          <Text>Waiting for your rpc</Text>
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
      </Rows>
      <SpaceBetween>
        <ButtonSmall onClick={() => nextStep(7)}>Prev</ButtonSmall>
        <div />
      </SpaceBetween>
    </Card>
  )
}

export default Step8