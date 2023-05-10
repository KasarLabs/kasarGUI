import styled from 'styled-components'
import Step1 from './components/Steps/Step1'
import Step2 from './components/Steps/Step2'


const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
  

`

function App() {
  return (
    <Main>
      {/* <Step1 /> */}
      <Step2 />
    </Main>
  )
}

export default App
