import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import { shell } from 'electron';

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

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}



function Step2({ nextStep, previousStep }: PreviousStepProps) {

  // const handleConnect = async () => {
  //   console.log("1")
  //   const accounts = await window?.ethereum?.request({
  //     method: 'eth_requestAccounts',
  //   })
  //   console.log("2")

  //   if (accounts.length > 0) {
  //     const balance = await window.ethereum!.request({
  //       method: 'eth_getBalance',
  //       params: [accounts[0], 'latest'],
  //     })
  //   }
  // }

  const handleClick = () => {
    shell.openExternal('https://github.com');
    nextStep(3)
  }


  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            2. Please identify yourself using your wallet
          </TextGray>
        </Row>
        {/* <OutlineButton onClick={() => nextStep(3)}>
          Connect your wallet
          <img src={ArrowGray} />
        </OutlineButton> */}
        <OutlineButton onClick={handleClick}>
          Connect Wallet
        </OutlineButton>
        {/* <ButtonConnect /> */}

        <Buttons>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step2