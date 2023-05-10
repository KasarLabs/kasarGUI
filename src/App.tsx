import styled from 'styled-components'
import Step1 from './components/Steps/Step1'

const Main = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 95vh;
  

`

function App() {
  return (
    <Main>
      <Step1 />
    </Main>
  )
}

export default App
