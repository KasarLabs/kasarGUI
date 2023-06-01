import React, { useEffect } from 'react'
import { Button, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H2, H1, TextGray } from '../../s-components/Texts'
import Logo from '../../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import { BsTelegram, BsTwitter, BsGithub } from 'react-icons/bs';
import { shell } from 'electron'

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

const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  justify-content: center;
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
          <H2>Thank you for registering</H2>
          <TextGray>
            You have received an email. Please check your email (spam).
            If you didn't receive an email, please contact support <span style={{ cursor: 'pointer', color: '#2969D2' }} onClick={() => shell.openExternal('https://t.me/kasarlabs')} >here</span>
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