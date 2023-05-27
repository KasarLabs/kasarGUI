import React from 'react'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { Text } from './s-components/Texts'

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

export interface IRegister {
  handleSubmit: (e: any) => Promise<void>;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
  setFirstName: (e: string) => void;
  setLastName: (e: string) => void;
  setUserName: (e: string) => void;
}


function Register({
  handleSubmit,
  email,
  setEmail,
  password,
  setPassword,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  userName,
  setUserName,
}: IRegister) {
  return (
    <form onSubmit={handleSubmit} id='auth'>
      <Inputs>
        <FlexRow>
          <Block>
            <Text>First name</Text>
            <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter your first name' />
          </Block>
          <Block>
            <Text>Last name</Text>
            <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Enter your last name' />
          </Block>
        </FlexRow>
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
  )
}

export default Register