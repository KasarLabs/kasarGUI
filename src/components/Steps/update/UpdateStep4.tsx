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
  justify-content: space-between;
  gap: 11px;
  width:100%; 
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function UpdateStep4({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Update my starknode</H1>
        </Row>
        <Row>
          <Button onClick={() => nextStep(15)}>
            (update detected)
            Update [version] detected for [client]?
          </Button>
        </Row>
        <Inputs>
          <Button onClick={previousStep}>Prev</Button>
          <Button>Update</Button>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default UpdateStep4