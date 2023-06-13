import React, { useState } from 'react'
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
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
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
  setStep: (e: number) => void;
  step: number;
  setVerifyPass: (e: string) => void;
  verifyPass: string;
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
  setStep,
  step,
  setVerifyPass,
  verifyPass,
}: IRegister) {


  return (
    <form onSubmit={handleSubmit} id='auth' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
      <Inputs>
        {step === 1 &&
          <FlexRow>
            <Block>
              <Text>First name</Text>
              <Input value={firstName} onChange={(e: any) => setFirstName(e.target.value)} placeholder='Enter your first name' />
            </Block>
            <Block>
              <Text>Last name</Text>
              <Input value={lastName} onChange={(e: any) => setLastName(e.target.value)} placeholder='Enter your last name' />
            </Block>
            <Block>
              <Text>Username</Text>
              <Input value={userName} onChange={(e: any) => setUserName(e.target.value)} placeholder='Enter your username' />
            </Block>
          </FlexRow>
        }
        {step === 2 &&
          <Block>
            <Text>Mail</Text>
            <Input value={email} onChange={(e: any) => setEmail(e.target.value)} placeholder='Enter your email' />
          </Block>
        }

        {step === 3 &&
          <FlexRow>
            <Block>
              <Text>Password</Text>
              <Input value={password} onChange={(e: any) => setPassword(e.target.value)} type='password' placeholder='Enter a password' />
            </Block>
            <Block>
              <Text>Verify your password</Text>
              <Input value={verifyPass} onChange={(e: any) => setVerifyPass(e.target.value)} type='password' placeholder='Enter password again' />
            </Block>
          </FlexRow>
        }
      </Inputs>
    </form>
  )
}

export default Register