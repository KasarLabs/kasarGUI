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
          <H1>Welcome to <Gradient>Kasar</Gradient></H1>
          <TextGray>
            Please login to access your account or register if you're new here.
          </TextGray>
        </Row>

        <Buttons>
          <OutlineButton onClick={() => nextStep(1)}>
            Sign up
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