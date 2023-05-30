import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import SetupGif from '../../../assets/gif/board.gif'


const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: space-around;
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

const Image = styled.img`
  width: 100%;
`


type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}


function Step5({ nextStep, previousStep }: PreviousStepProps) {
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
        <Image onClick={() => nextStep(6)} src={SetupGif} alt='setup starknode' />

        {/* <Button onClick={() => nextStep(7)}>Loading</Button> */}
        {/* <Inputs>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Inputs> */}
      </Rows>
    </Card>
  )
}

export default Step5
