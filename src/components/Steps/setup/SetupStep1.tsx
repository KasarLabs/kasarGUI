import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray, Gradient } from '../../s-components/Texts'
import styled from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { shell } from 'electron';
import { useState } from 'react'
import axios from 'axios'
import { SeparatorSM } from '@/components/s-components/utils'
import Register from '@/components/Register'
import { toast } from 'react-toastify';
import { SERVER_PUBLIC_API } from '@/constants'
import { TailSpin } from 'react-loader-spinner'

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
  width: 100%;

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
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [ok, setOk] = useState(false);
  const [step, setStep] = useState(1)
  const [verifyPass, setVerifyPass] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true)
    try {
      const { data } = await axios.post(`${SERVER_PUBLIC_API}/register`, {
        firstName: firstName,
        lastName: lastName,
        userName: userName,
        email: email,
        password: password,
      });
      if (data.error) {
        setLoading(false)
        toast.error(data.error)
      }
      if (data.success) {
        setLoading(false)
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
      setLoading(false)
      nextStep(0);
    }
  }

  function isDisabledButton(step: number, firstName: string, lastName: string, userName: string, email: string, password: string) {
    switch (step) {
      case 1:
        return !firstName || !lastName || !userName;
      case 2:
        return !email;
      default:
        return false;
    }
  }

  function isDisabledButtonSubmit(step: number, password: string, verifyPass: string) {
    if (step === 3) {
      if (!password) {
        return true
      }
      if (!verifyPass) {
        return true
      }
      if (password !== verifyPass) {
        return true
      }
      return false
    }
    return false
  }

  const handleNextButton = async (step: number, userName: string) => {
    if (step === 1) {
      try {
        const { data } = await axios.post(`${SERVER_PUBLIC_API}/checkUsernameIsTaken`, {
          userName: userName,
        });
        if (data.ok) {
          toast.error('userName already taken')
        } else {
          setStep(step + 1)
        }
      } catch (err) {
        console.log(err)
      }
    } else if (step === 2) {
      try {
        const { data } = await axios.post(`${SERVER_PUBLIC_API}/checkEmailIsTaken`, {
          email: email,
        });
        if (data.ok) {
          toast.error('Email already taken')
        } else {
          setStep(step + 1)
        }
      } catch (err) {
        console.log(err)
      }

    } else {
      setStep(step + 1)
    }

  }

  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my <Gradient>Starknode</Gradient></H1>

          {step === 1 &&
            <TextGray>
              2. Please enter your first name, last name and username.
            </TextGray>
          }
          {step === 2 &&
            <TextGray>
              2. Please enter your email
            </TextGray>
          }
          {step === 3 &&
            <TextGray>
              2. Please enter a password (min 6 characters)
            </TextGray>
          }
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
          setVerifyPass={setVerifyPass}
          verifyPass={verifyPass}
        />

        <SeparatorSM />
        {step === 1 || step === 2 ?
          <FlexRow>
            <Buttons>
              <ButtonSmall type='button' onClick={previousStep}>Prev</ButtonSmall>
            </Buttons>
            <ButtonSmall type='button' disabled={isDisabledButton(step, firstName, lastName, userName, email, password)} onClick={() => handleNextButton(step, userName)}>
              Next
            </ButtonSmall>
          </FlexRow>
          :
          <FlexRow>
            <Buttons>
              <ButtonSmall type='button' onClick={previousStep}>Prev</ButtonSmall>
            </Buttons>
            {loading ?
              <ButtonSmall disabled={isDisabledButtonSubmit(step, password, verifyPass)} type='button' form='auth' value='Submit' onClick={handleSubmit}>
                <TailSpin
                  height="20"
                  width="20"
                  color="#fff"
                  ariaLabel="tail-spin-loading"
                  radius="2"
                  wrapperStyle={{}}
                  wrapperClass=""
                  visible={true}
                />
              </ButtonSmall>
              :
              <ButtonSmall disabled={isDisabledButtonSubmit(step, password, verifyPass)} type='button' form='auth' value='Submit' onClick={handleSubmit}>
                Submit
              </ButtonSmall>
            }
          </FlexRow>
        }
      </Rows>
    </Card>
  )
}
export default Step1