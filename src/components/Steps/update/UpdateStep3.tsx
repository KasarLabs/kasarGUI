import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'


const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-between;
  height: 100%;
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

function UpdateStep3({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Update my starknode</H1>
        </Row>
        <Row>

          <TextGray>
            Detecting any update on your client
          </TextGray>
          <Button onClick={() => nextStep(14)}>Loading</Button>
        </Row>

        <Inputs>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default UpdateStep3