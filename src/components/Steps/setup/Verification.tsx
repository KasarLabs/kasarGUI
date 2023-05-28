import React, { useEffect } from 'react'
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


type StepProps = {
  nextStep: (num: number) => void;
}

function Verification({ nextStep }: StepProps) {

  return (
    <Card>
      <Rows>
        <Row>
          <Image src={Logo} alt='starknode' />
          <H1>Thank you for registering</H1>
          <TextGray>
            You have received an email. Please check your email (spam)
          </TextGray>
        </Row>

        <Buttons>
          <OutlineButton onClick={() => nextStep(8)}>
            Login
            <img src={ArrowGray} />
          </OutlineButton>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Verification