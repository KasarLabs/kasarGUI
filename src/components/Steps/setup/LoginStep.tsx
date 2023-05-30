
import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray, Text, Gradient } from '../../s-components/Texts'
import styled from 'styled-components'
import { useState } from 'react'
import axios from 'axios'
import { SeparatorSM } from '@/components/s-components/utils'
import Login from '@/components/Login'
import { toast } from 'react-toastify';
import { SERVER_PUBLIC_API } from '@/constants'

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  width: 100%;
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
  setEmail: (arg: string) => void;
  email: string;

}

function LoginStep({ nextStep, previousStep, setEmail, email }: PreviousStepProps) {
  const [password, setPassword] = useState('');
  const [state, setState] = useState({});


  const handleLogin = async (e: any) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(`${SERVER_PUBLIC_API}/login`, {
        email: email,
        password: password,
      });
      if (data.error) {
        toast.error(data.error)
      } else {
        setState({
          user: data.user,
          token: data.token
        });
        toast.success('User Logged in')
        nextStep(2);
      }
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Log in to <Gradient>Kasar</Gradient></H1>
          <TextGray>
            Please, enter your email and password.
          </TextGray>
        </Row>

        <Login
          handleLogin={handleLogin}
          email={email}
          password={password}
          setEmail={setEmail}
          setPassword={setPassword}
        />

        <SeparatorSM />

        <FlexRow>
          <Buttons>
            <ButtonSmall onClick={() => nextStep(0)}>Prev</ButtonSmall>
          </Buttons>
          <ButtonSmall type='submit' form='auth' value='Submit'>
            Submit
          </ButtonSmall>
        </FlexRow>
      </Rows>
    </Card>
  )
}

export default LoginStep


