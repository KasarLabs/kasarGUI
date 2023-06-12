import React from 'react'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { H1, Text, TextGray } from './s-components/Texts'
import { ButtonSmall } from './s-components/Buttons'
import axios from 'axios'
import { SERVER_PUBLIC_API } from '@/constants'
import { toast } from 'react-toastify';
import { Card } from './s-components/Card'


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
`

const Buttons = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const Inputs = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;

`

const Block = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export interface IResetPassword {
  email: string;
  setEmail: (e: string) => void;
  nextStep: (num: number) => void;
  previousStep: () => void;
}


function ResetPassword({
  email,
  setEmail,
  nextStep,
  previousStep
}: IResetPassword) {

  const handleReset = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${SERVER_PUBLIC_API}/forgot-password`, {
        email: email,
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        // console.log(data)
        toast.success(data.message)
        nextStep(8)
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Reset your Password</H1>
          <TextGray>
            Please enter your email to reset your password
          </TextGray>
        </Row>
        <Row>
          <Inputs>
            <Block>
              <Text>Mail</Text>
              <Input value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder='Enter your email' />
            </Block>
          </Inputs>
        </Row>

        <FlexRow>
          <Buttons>
            <ButtonSmall onClick={() => nextStep(0)}>Prev</ButtonSmall>
          </Buttons>
          <ButtonSmall onClick={handleReset}>
            Reset
          </ButtonSmall>
        </FlexRow>
      </Rows>
    </Card>
  )
}

export default ResetPassword