import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray, Text } from '../../s-components/Texts'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { shell } from 'electron';
import { useState } from 'react'
import axios from 'axios'

const Image = styled.img`
  max-width: 180px;
`

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

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}



function Step2({ nextStep, previousStep }: PreviousStepProps) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secret, setSecret] = useState('');
  const [ok, setOk] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleClick = () => {
    nextStep(3)
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    setLoading(true);
    console.log('heyy')
    try {
      const { data } = await axios.post('http://localhost:8000/api/register', {
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
      }
    } catch (err) {
      console.log(err)
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
        <form onSubmit={handleSubmit} id='auth'>
          <Inputs>
            <Block>
              <Text>First name</Text>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter your first name' />
            </Block>
            <Block>
              <Text>Last name</Text>
              <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Enter your last name' />
            </Block>
            <Block>
              <Text>Mail</Text>
              <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' />
            </Block>
            <Block>
              <Text>Username</Text>
              <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder='Enter your username' />
            </Block>
            <Block>
              <Text>Password</Text>
              <Input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter a password' />
            </Block>
          </Inputs>
        </form>
        <OutlineButton type='submit' form='auth' value='Submit'>
          Submit
        </OutlineButton>

        <Buttons>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step2