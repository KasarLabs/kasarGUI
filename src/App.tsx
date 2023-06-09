import styled from 'styled-components'
import Step1 from './components/Steps/Step1'
import Setup0 from './components/Steps/setup/SetupStep0'
import Setup1 from './components/Steps/setup/SetupStep1'
import Setup2 from './components/Steps/setup/SetupStep2'
import Setup3 from './components/Steps/setup/SetupStep3'
import Setup4 from './components/Steps/setup/SetupStep4'
import Setup5 from './components/Steps/setup/SetupStep5'
import Setup6 from './components/Steps/setup/SetupStep6'
import { useState } from 'react'
import LoginStep from './components/Steps/setup/LoginStep'
import Verification from './components/Steps/setup/Verification'
import ResetPassword from './components/ResetPassword'


const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
`

export interface IStep {
  previousStep: () => void;
}

export interface IJson {
  name: string;
  client: string;
  rpc_key: string;
  osiris_key: string;
  provider_id: string;
  node_id: string;
  wallet: string;
  action: string;
}

function App() {
  const [step, setStep] = useState(-1);
  const [jsonData, setJsonData] = useState<IJson>();
  const [pathSD, setPathSD] = useState('')
  const [email, setEmail] = useState('');
  const [uuid, setUuid] = useState('');


  const previousStep = () => {
    setStep(step - 1);
  }

  const nextStep = (num: number) => {
    setStep(num);
  }


  return (
    <Main>
      {step === -1 && <Step1 nextStep={nextStep} />}
      {step === 0 && <Setup0 nextStep={nextStep} previousStep={previousStep} />}
      {step === 8 && <LoginStep nextStep={nextStep} previousStep={previousStep} setEmail={setEmail} email={email} />}
      {step === 1 && <Setup1 nextStep={nextStep} previousStep={previousStep} />}
      {step === 2 && <Setup2 nextStep={nextStep} previousStep={previousStep} setPathSD={setPathSD} pathSD={pathSD} />}
      {step === 3 && <Setup3 nextStep={nextStep} previousStep={previousStep} setUuid={setUuid} setJsonData={setJsonData} jsonData={jsonData} email={email} />}
      {step === 4 && <Setup4 nextStep={nextStep} previousStep={previousStep} jsonData={jsonData} pathSD={pathSD} setPathSD={setPathSD} />}
      {step === 5 && <Setup5 nextStep={nextStep} previousStep={previousStep} jsonData={jsonData} />}
      {step === 6 && <Setup6 nextStep={nextStep} previousStep={previousStep} uuid={uuid} jsonData={jsonData} />}
      {step === 9 && <Verification nextStep={nextStep} />}
      {step === 10 && <ResetPassword nextStep={nextStep} previousStep={previousStep} setEmail={setEmail} email={email} />}
    </Main>
  )
}

export default App
