import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGraySM, TextGray, Gradient } from '../../s-components/Texts'
import styled from 'styled-components'
import SetupGif from '../../../assets/gif/board.gif'
import { Separator, SeparatorSM } from '@/components/s-components/utils'


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

const RowStep = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
p {
    text-align: start;
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
  border-radius: 5px;
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
          <H1>Setup my <Gradient>Starknode</Gradient></H1>
          <TextGray>
            6. Follow these steps:
          </TextGray>
        </Row>
        <RowStep>
          <TextGraySM>
            (1) Safely eject the micro SD from your computer, (2) insert it into your Starknode. (3) Connect your Starknode to the Ethernet with the necessary cable, (4) Plug it into a power source. Then click on 'Next'.
          </TextGraySM>
        </RowStep>
        <Image src={SetupGif} alt='setup starknode' />
        <Inputs>
          <ButtonSmall onClick={() => nextStep(6)}>Next</ButtonSmall>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default Step5
