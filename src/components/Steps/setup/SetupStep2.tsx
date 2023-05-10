import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'


const Image = styled.img`
  max-width: 180px;
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function Step2({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            2. Please identify yourself using your wallet
          </TextGray>
        </Row>
        <OutlineButton onClick={() => nextStep(3)}>
          Connect your wallet
          <img src={ArrowGray} />
        </OutlineButton>

        <Buttons>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step2