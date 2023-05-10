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

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
  width: 100%;
`

type StepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function Step1({ nextStep, previousStep }: StepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            1. Please connect your Micro SD card to your computer using the USB to microSD flasher
          </TextGray>
        </Row>
        <Image src={SetupGif} alt='setup starknode' />

        <Buttons>
          <OutlineButton onClick={() => nextStep(2)}>
            Setup your micro SD storage
            <img src={ArrowGray} />
          </OutlineButton>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step1