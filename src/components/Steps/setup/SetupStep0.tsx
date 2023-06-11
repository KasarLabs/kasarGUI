import React, { useEffect } from 'react'
import { ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, TextGray } from '../../s-components/Texts'
import Logo from '../../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import { SERVER_NODE_API } from '@/constants'
import axios from 'axios'
import { Separator } from '@/components/s-components/utils'

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

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  gap: 10px;
`

function SetupStep0({ nextStep, previousStep }: PreviousStepProps) {
  // useEffect(() => {
  //   const id = 8
  //   const sendData = async () => {
  //     const { data } = await axios.get(`${SERVER_NODE_API}/node/remove?id=${id}&provider_id="d9ef45ba-0f62-47f6-a010-07d4ff86e886"`)
  //     console.log('!!!', data)
  //   }
  //   sendData()
  // })
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
      <Separator />
      <FlexRow>
        <ButtonSmall onClick={() => nextStep(-1)}>Prev</ButtonSmall>
        <div />
      </FlexRow>
    </Card>
  )
}

export default SetupStep0