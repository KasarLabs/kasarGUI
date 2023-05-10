import styled from 'styled-components'
import Step1 from './components/Steps/Step1'
import Setup1 from './components/Steps/setup/SetupStep1'
import Setup2 from './components/Steps/setup/SetupStep2'
import Setup3 from './components/Steps/setup/SetupStep3'
import Setup4 from './components/Steps/setup/SetupStep4'
import Setup5 from './components/Steps/setup/SetupStep5'
import Setup6 from './components/Steps/setup/SetupStep6'
import Setup7 from './components/Steps/setup/SetupStep7'
import UpdateStep1 from './components/Steps/update/UpdateStep1'
import UpdateStep2 from './components/Steps/update/UpdateStep2'
import UpdateStep3 from './components/Steps/update/UpdateStep3'
import UpdateStep4 from './components/Steps/update/UpdateStep4'
import { useState } from 'react'

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
`

export interface IStep {
  previousStep: () => void;
}

function App() {
  const [step, setStep] = useState(0);

  const previousStep = () => {
    setStep(step - 1);
  }

  const nextStep = (num: number) => {
    setStep(num);
  }
  return (
    <Main>
      {step === 0 && <Step1 nextStep={nextStep} />}
      {step === 1 && <Setup1 nextStep={nextStep} previousStep={previousStep} />}
      {step === 2 && <Setup2 nextStep={nextStep} previousStep={previousStep} />}
      {step === 3 && <Setup3 nextStep={nextStep} previousStep={previousStep} />}
      {step === 4 && <Setup4 nextStep={nextStep} previousStep={previousStep} />}
      {step === 5 && <Setup5 nextStep={nextStep} previousStep={previousStep} />}
      {step === 6 && <Setup6 nextStep={nextStep} previousStep={previousStep} />}
      {step === 7 && <Setup7 nextStep={nextStep} previousStep={previousStep} />}
      {step === 11 && <UpdateStep1 nextStep={nextStep} previousStep={previousStep} />}
      {step === 12 && <UpdateStep2 nextStep={nextStep} previousStep={previousStep} />}
      {step === 13 && <UpdateStep3 nextStep={nextStep} previousStep={previousStep} />}
      {step === 14 && <UpdateStep4 nextStep={nextStep} previousStep={previousStep} />}
    </Main>
  )
}

export default App
