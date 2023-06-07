


import { ButtonSmall } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text } from '../../s-components/Texts'
import styled from 'styled-components'
import { Separator } from '@/components/s-components/utils'
import { SpaceBetween } from '@/components/s-components/Flex'

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

function Step7({ nextStep, previousStep }: PreviousStepProps) {

  return (
    <Card>
      <Rows>
        <Row>
          <H1>Query you <Gradient>Starknode</Gradient></H1>
          <Text>how to expose your RPC</Text>
        </Row>
        <Separator />
        <Text>lorem ipsum...</Text>
      </Rows>
      <SpaceBetween>
        <ButtonSmall onClick={() => nextStep(7)}>Prev</ButtonSmall>
        <ButtonSmall onClick={() => nextStep(15)}>Next</ButtonSmall>
      </SpaceBetween>
    </Card>
  )
}

export default Step7