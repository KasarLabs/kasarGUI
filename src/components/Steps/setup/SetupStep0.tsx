import React from 'react'
import { Button, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, TextGray } from '../../s-components/Texts'
import Logo from '../../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'

const Image = styled.img`
  width: 61px;
  height: 61px;  
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
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
`
type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}


function SetupStep0({ nextStep, previousStep }: PreviousStepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <Image src={Logo} alt='starknode' />
          <H1>Welcome to <Gradient>Osiris</Gradient></H1>
          <TextGray>
            Let’s guide you through the process of setting
            up or updating your Starknode.
          </TextGray>
        </Row>

        <Buttons>
          <OutlineButton onClick={() => nextStep(1)}>
            Register
            <img src={ArrowGray} />
          </OutlineButton>
          <OutlineButton onClick={() => nextStep(8)}>
            Login
            <img src={ArrowGray} />
          </OutlineButton>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default SetupStep0