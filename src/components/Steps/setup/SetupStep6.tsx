import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'


const Image = styled.img`
  max-width: 180px;
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  align-items: center;
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
  gap: 20px;
  align-items: center;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function Step6({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            6. Wait for your Starknode to be detected by your network.
            Please do not unplug the device!
          </TextGray>
        </Row>
        <Button onClick={() => nextStep(7)}>Loading</Button>
        <Inputs>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default Step6