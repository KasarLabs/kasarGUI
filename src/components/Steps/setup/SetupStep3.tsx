import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'
import { IJson } from '@/App'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_PUBLIC_API } from '@/constants'
import { SeparatorSM } from '@/components/s-components/utils'

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
  gap: 10px;
  width: 100%;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

const Selector = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  left: 00%;
  top:25%;
  width: 200px;
  background-color: #FFF;
  border: none;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

const Client = styled.div`
  transition: 0.2s;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: #2962D2;
    p {
      color: black;
    }
  }
`

const ClientButton = styled.button`
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  border: 1px solid #EAEAEA;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
  height: 57px;
  font-weight: 400;
  font-size: 16px;
  color: black;
  padding: 0 20px;
  cursor: pointer;
  display: flex;
  justify-content: start;
  align-items: center;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
  setJsonData: Dispatch<SetStateAction<IJson | undefined>>;
  jsonData: IJson | undefined;
  email: string;
  setUuid: (num: string) => void;
}


function Step3({ nextStep, previousStep, setJsonData, jsonData, email, setUuid }: PreviousStepProps) {
  const [nameNode, setName] = useState('')
  const [client, setClient] = useState('Pathfinder')
  const [rpc, setRpc] = useState('')
  const [open, setOpen] = useState(false)

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${SERVER_PUBLIC_API}/getUserFromEmail`, {
        identifier: email,
      });
      if (data.error) {
        console.log(data.error)
      }
      if (nameNode && client && rpc && data) {
        setJsonData({ name: nameNode, client: client, rpc_key: rpc, token: data.token, wallet: data.wallet, action: 'install' })
        setUuid(data.token)
        nextStep(4)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const selectClient = () => {
    setClient('Pathfinder')
    setOpen(!open)
  }

  function isDisabledButton(nameNode: string, client: string, rpc: string) {
    if (!nameNode || !client || !rpc)
      return true
    return false;
  }
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my <Gradient>Starknode</Gradient></H1>
          <TextGray>
            3. Next, configure your device
          </TextGray>
        </Row>
        <form onSubmit={handleSubmit} id='auth'>
          <Inputs>
            <Block>
              <Text>Node name</Text>
              <Input value={nameNode} onChange={e => setName(e.target.value)} placeholder='Enter a name' />
            </Block>
            <Block style={{ position: 'relative' }} >
              <Text>Client</Text>
              <ClientButton type='button' onClick={() => setOpen(!open)}>{client}</ClientButton>
              {open &&
                <Selector onClick={selectClient}>
                  <Client>
                    <TextGray>
                      Pathfinder
                    </TextGray>
                  </Client>
                </Selector>
              }
            </Block>
            <Block>
              <Text>Ethereum RPC url</Text>
              <Input value={rpc} onChange={e => setRpc(e.target.value)} placeholder='Enter your L1 RPC url key' />
            </Block>
          </Inputs>
        </form>
        <SeparatorSM />
        <SpaceBetween>
          <ButtonSmall type='button' onClick={previousStep}>Prev</ButtonSmall>
          <ButtonSmall disabled={isDisabledButton(nameNode, client, rpc)} type='submit' form='auth'>Submit</ButtonSmall>
        </SpaceBetween>
      </Rows>
    </Card>
  )
}

export default Step3