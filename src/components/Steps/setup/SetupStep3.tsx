import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'
import { IJson } from '@/App'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'

const Image = styled.img`
  max-width: 180px;
`

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

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
  setJsonData: Dispatch<SetStateAction<IJson | undefined>>;
  jsonData: IJson | undefined;
}


function Step3({ nextStep, previousStep, setJsonData, jsonData }: PreviousStepProps) {
  const [name, setName] = useState('')
  const [client, setClient] = useState('')
  const [rpc, setRpc] = useState('')

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name && client && rpc) {
      setJsonData({ nameNode: name, clientNode: client, rpcKey: rpc })
      nextStep(4)
    }
  }

  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            3. Next, configure your device
          </TextGray>
        </Row>
        <form onSubmit={handleSubmit} id='auth'>
          <Inputs>
            <Block>
              <Text>Node name</Text>
              <Input value={name} onChange={e => setName(e.target.value)} placeholder='Enter a name' />
            </Block>
            <Block>
              <Text>Client</Text>
              <Input value={client} onChange={e => setClient(e.target.value)} placeholder='Enter a client' />
            </Block>
            <Block>
              <Text>Ethereum RPC url</Text>
              <Input value={rpc} onChange={e => setRpc(e.target.value)} placeholder='Enter your L1 RPC url key' />
            </Block>
          </Inputs>
        </form>
        <SpaceBetween>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
          <ButtonSmall type='submit' form='auth'>Submit</ButtonSmall>
        </SpaceBetween>
      </Rows>
    </Card>
  )
}

export default Step3