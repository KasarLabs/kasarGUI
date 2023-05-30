import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGraySM, TextGray } from '../../s-components/Texts'
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
            6. Follow these steps:
          </TextGray>
        </Row>
        <RowStep>
          <TextGraySM>
            1. Remove the micro SD card from your computer.<br />
            2. Insert the micro SD card into your starknode.<br />
            3. Connect your starknode to the ethernet.<br />
            4. Plug your starknode to a power source.<br />
            5. Click "Next" when you have completed these steps.<br />
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
