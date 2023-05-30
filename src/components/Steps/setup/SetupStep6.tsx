


import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
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

const Image = styled.img`
  max-width: 180px;
`

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
  uuid: string;
}

function Step6({ nextStep, previousStep, uuid }: PreviousStepProps) {
  useEffect(() => {
    const callNode = async () => {
      const { data } = await axios.post(`${SERVER_NODE_API}/node/getAllOf?provider_id=${uuid}`, {
      });
      console.log(data)
    }
    callNode()
  }, [])
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Fetching your node(s)</H1>
          <Text>Please wait, synchronization is in progress...</Text>
        </Row>
        <Separator />
        {/* <Inputs>
          <ButtonSmall onClick={() => nextStep(-1)}>Home</ButtonSmall>
        </Inputs> */}
      </Rows>
    </Card>
  )
}

export default Step6