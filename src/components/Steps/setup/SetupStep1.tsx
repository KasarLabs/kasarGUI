import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray, Text } from '../../s-components/Texts'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { shell } from 'electron';
import { useState } from 'react'
import axios from 'axios'
import { SeparatorSM } from '@/components/s-components/utils'
import Register from '@/components/Register'
import { toast } from 'react-toastify';

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
  p {
    text-align: center;
  }
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
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}


const Span = styled.span`
  cursor: pointer;
  color:#2969D2;
`


function Step1({ nextStep, previousStep }: PreviousStepProps) {
  const [userExist, setUserExist] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [step, setStep] = useState(1)

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${process.env.SERVER_PUBLIC_API!}/register`, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      });
      if (data.error) {
        toast.error(data.error)
      }
      if (data.success) {
        toast.success('Congratulations, you are now registered!')
        setOk(data.on);
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        nextStep(9);
      }
    } catch (err) {
      //@ts-ignore
      toast.error(err.response.data)
      nextStep(0);
    }
  }

  function isDisabledButton(step: number, firstName: string, lastName: string, userName: string, email: string, password: string) {
    switch (step) {
      case 1:
        return !firstName || !lastName;
      case 2:
        return !userName;
      case 3:
        return !email;
      case 4:
        return !password;
      default:
        return false;
    }
  }

  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            2. Register
          </TextGray>
        </Row>

        <Register
          handleSubmit={handleSubmit}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
          firstName={firstName}
          setFirstName={setFirstName}
          lastName={lastName}
          setLastName={setLastName}
          userName={userName}
          setUserName={setUserName}
          setStep={setStep}
          step={step}
        />

        <SeparatorSM />
        {step === 1 || step === 2 || step === 3 || step === 4 ?
          <FlexRow>
            <Buttons>
              <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
            </Buttons>
            <ButtonSmall disabled={isDisabledButton(step, firstName, lastName, userName, email, password)} onClick={() => setStep(step + 1)}>
              Next
            </ButtonSmall>
          </FlexRow>
          :
          <FlexRow>
            <Buttons>
              <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
            </Buttons>
            <ButtonSmall type='submit' form='auth' value='Submit'>
              Submit
            </ButtonSmall>
          </FlexRow>
        }
      </Rows>
    </Card>
  )
}

export default Step1