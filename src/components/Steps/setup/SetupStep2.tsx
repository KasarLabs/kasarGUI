import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray, Text } from '../../s-components/Texts'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { shell } from 'electron';
import { useState } from 'react'
import axios from 'axios'
import { SeparatorSM } from '@/components/s-components/utils'
import Login from '@/components/Login'
import Register from '@/components/Register'

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


function Step2({ nextStep, previousStep }: PreviousStepProps) {
  const [userExist, setUserExist] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);
  const [state, setState] = useState({});

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.SERVER_PUBLIC_API!}/register`, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      });
      if (data.error) {
        setLoading(false)
        console.log(data.error)
      }
      if (data.success) {
        setOk(data.on);
        setFirstName('');
        setLastName('');
        setUserName('');
        setEmail('');
        setPassword('');
        setLoading(false);
        nextStep(3);
      }
    } catch (err) {
      console.log(err)
      setLoading(false);
    }
  }

  const handleLogin = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    try {
      const { data } = await axios.post(`${process.env.SERVER_PUBLIC_API!}/login`, {
        email: email,
        password: password,
      });
      if (data.error) {
        console.log(data.error)
        setLoading(false)
      } else {
        setState({
          user: data.user,
          token: data.token
        });
        setLoading(false);
        nextStep(3);
      }
    } catch (err) {
      // console.log(err.response.data);
      setLoading(false);
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
        {userExist ?
          <Login
            handleLogin={handleLogin}
            email={email}
            password={password}
            setEmail={setEmail}
            setPassword={setPassword}
          />
          :
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
          />
        }
        {userExist ?
          <Text>Not registered yet? <Span onClick={() => setUserExist(false)}>Register</Span></Text>
          :
          <Text>Already have an account? <Span onClick={() => setUserExist(true)}>Login</Span></Text>
        }
        <SeparatorSM />
        <FlexRow>
          <Buttons>
            <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
          </Buttons>
          <ButtonSmall type='submit' form='auth' value='Submit'>
            Submit
          </ButtonSmall>
        </FlexRow>
      </Rows>
    </Card>
  )
}

export default Step2