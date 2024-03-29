import { ButtonSmall } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray } from '../../s-components/Texts'
import styled, { css } from 'styled-components'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'
import { IJson } from '@/App'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import axios from 'axios'
import { SERVER_PUBLIC_API, SERVER_NODE_API } from '@/constants'
import { SeparatorSM } from '@/components/s-components/utils'
import Arrow from '../../../assets/icons/arrow-down.png'

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
  left: 80%;
  top:90%;
  width: 110px;
  background-color: #FFF;
  border: none;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  border-radius: 5px;
`

interface ClientProps {
  disabled?: boolean;
}

const Client = styled.div<ClientProps>`
  transition: 0.2s;
  padding: 10px;
  border-radius: 5px;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  background-color: ${({ disabled }) => (disabled ? '#D3D3D3' : 'white')};
  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#D3D3D3' : '#2962D2')};
    p {
      color: black;
    }
  }
`;

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
  justify-content: space-between;
  align-items: center;
`

const ArrowDown = styled.img`
  width: 15px;
  height: 15px;
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
  const [client, setClient] = useState('juno')
  const [rpc, setRpc] = useState('')
  const [wallet, setWallet] = useState('')
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
      const { data: dataNode } = await axios.post(`${SERVER_NODE_API}/node/create`, {
        ID: 0,
        Name: nameNode,
        ProviderId: data.token,
        Wallet: wallet,
        State: 'null',
        Client: client,
        Version: 0.1,
      });

      if (nameNode && client && rpc && data && dataNode) {
        setJsonData({
          name: nameNode,
          client: client,
          rpc_key: rpc,
          osiris_key: "null",
          provider_id: data.token,
          node_id: dataNode.ID.toString(),
          wallet: wallet,
          action: 'update'
        })
        setUuid(data.token)
        nextStep(4)
      }
    } catch (err) {
      console.log(err)
    }
  }

  const selectClient = (arg: string) => {
    setClient(arg)
    setOpen(!open)
  }

  function isDisabledButton(nameNode: string, client: string, rpc: string, wallet: string) {
    if (!nameNode || !client || !rpc || !wallet)
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
              <Input value={nameNode} onChange={(e: any) => setName(e.target.value)} placeholder='Enter a name' />
            </Block>
            <Block style={{ position: 'relative' }} >
              <Text>Client</Text>
              <ClientButton type='button' onClick={() => setOpen(!open)}>
                {client}
                <ArrowDown src={Arrow} alt='starknode' />
              </ClientButton>
              {open &&
                <Selector>
                  {/* <Client onClick={() => selectClient('pathfinder')}> */}
                  <Client onClick={() => selectClient('juno')}>
                    <TextGray>
                      juno
                    </TextGray>
                  </Client>
                  <Client disabled>
                    <TextGray>
                      pathfinder
                    </TextGray>
                  </Client>
                  <Client disabled>
                    <TextGray>
                      papyrus
                    </TextGray>
                  </Client>
                </Selector>
              }
            </Block>
            <Block>
              <Text>Ethereum RPC url</Text>
              <Input value={rpc} onChange={(e: any) => setRpc(e.target.value)} placeholder='Enter your L1 RPC url key' />
            </Block>
            <Block>
              <Text>Your Wallet</Text>
              <Input value={wallet} onChange={(e: any) => setWallet(e.target.value)} placeholder='Enter your Starknet wallet' />
            </Block>
          </Inputs>
        </form>
        <SeparatorSM />
        <SpaceBetween>
          <ButtonSmall type='button' onClick={previousStep}>Prev</ButtonSmall>
          <ButtonSmall disabled={isDisabledButton(nameNode, client, rpc, wallet)} type='submit' form='auth'>Submit</ButtonSmall>
        </SpaceBetween>
      </Rows>
    </Card>
  )
}

export default Step3