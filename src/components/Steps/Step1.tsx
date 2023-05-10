import React from 'react'
import { Button, OutlineButton } from '../s-components/Buttons'
import { Card } from '../s-components/Card'
import { Gradient, H1, TextGray } from '../s-components/Texts'
import Logo from '../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../assets/icons/ArrowGray.png'
import ArrowWhite from '../../assets/icons/ArrowWhite.png'


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

function Step1({ nextStep }: StepProps) {
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
            Setup my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
          <OutlineButton>
            Update my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
          <Button>
            Get a Starknode
            <img src={ArrowWhite} />
          </Button>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step1