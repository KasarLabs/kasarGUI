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
  justify-content: space-between;
  height: 100%;
  width: 100%;
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
  width: 100%;

`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function Step3({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            3. Next, configure your device
          </TextGray>
        </Row>

        <Inputs>
          <Block>
            <Text>Name</Text>
            <Input placeholder='Enter a name' />
          </Block>
          <Block>
            <Text>Client</Text>
            <Input placeholder='Enter a client' />
          </Block>
          <Block>
            <Text>Ethereum RPC url</Text>
            <Input placeholder='Enter your L1 RPC url key' />
          </Block>
        </Inputs>
        <SpaceBetween>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
          <ButtonSmall onClick={() => nextStep(4)}>Next</ButtonSmall>
        </SpaceBetween>
      </Rows>
    </Card>
  )
}

export default Step3