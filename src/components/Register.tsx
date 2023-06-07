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
  wallet: string;
  password: string;
  firstName: string;
  lastName: string;
  userName: string;
  setEmail: (e: string) => void;
  setWallet: (e: string) => void;
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
  setWallet,
  wallet
}: IRegister) {


  return (
    <form onSubmit={handleSubmit} id='auth' onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}>
      <Inputs>
        {step === 1 &&
          <FlexRow>
            <Block>
              <Text>First name</Text>
              <Input value={firstName} onChange={e => setFirstName(e.target.value)} placeholder='Enter your first name' />
            </Block>
            <Block>
              <Text>Last name</Text>
              <Input value={lastName} onChange={e => setLastName(e.target.value)} placeholder='Enter your last name' />
            </Block>
            <Block>
              <Text>Username</Text>
              <Input value={userName} onChange={e => setUserName(e.target.value)} placeholder='Enter your username' />
            </Block>
          </FlexRow>
        }
        {step === 2 &&
          <Block>
            <Text>Mail</Text>
            <Input value={email} onChange={e => setEmail(e.target.value)} placeholder='Enter your email' />
          </Block>
        }

        {step === 3 &&
          <Block>
            <Text>Wallet</Text>
            <Input value={wallet} onChange={e => setWallet(e.target.value)} placeholder='Enter your Starknet wallet' />
          </Block>
        }

        {step === 4 &&
          <FlexRow>
            <Block>
              <Text>Password</Text>
              <Input value={password} onChange={e => setPassword(e.target.value)} type='password' placeholder='Enter a password' />
            </Block>
            <Block>
              <Text>Verify your password</Text>
              <Input value={verifyPass} onChange={e => setVerifyPass(e.target.value)} type='password' placeholder='Enter password again' />
            </Block>
          </FlexRow>
        }
      </Inputs>
    </form>
  )
}

export default Register