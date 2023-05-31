import React from 'react'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { Text, TextGray } from './s-components/Texts'

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
width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`

export interface ILogin {
  handleLogin: (e: any) => Promise<void>;
  email: string;
  password: string;
  setEmail: (e: string) => void;
  setPassword: (e: string) => void;
}


function Login({
  handleLogin,
  email,
  setEmail,
  password,
  setPassword,
}: ILogin) {
  return (
    <form onSubmit={handleLogin} id='auth'>
      <Inputs>
        <Block>
          <Text>Mail</Text>
          <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' />
        </Block>
        <Block>
          <Text>Password</Text>
          <Input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter your password' />
        </Block>
      </Inputs>
    </form>
  )
}

export default Login