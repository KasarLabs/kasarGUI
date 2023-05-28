import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/setup.png'
import { Input } from '@/components/s-components/Input'
import { SpaceBetween } from '@/components/s-components/Flex'
import { IJson } from '@/App'
import fs from 'fs'
import path from 'path'
import usbDetect from 'usb-detection'
import { useEffect } from 'react'

const Image = styled.img`
  max-width: 180px;
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
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

const Inputs = styled.div`
 display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`

const Block = styled.div`
  display: flex;
  flex-direction: column;
`

type PreviousStepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
  jsonData: IJson | undefined;
  pathSD: string;
}

function Step4({ nextStep, previousStep, jsonData, pathSD }: PreviousStepProps) {
  useEffect(() => {
    fs.writeFile(path.join(process.cwd(), 'output.json'), JSON.stringify(jsonData), 'utf8', function (err) {
      if (err) {
        console.log('error', err)
      }
      console.log('JSON has been saved')
    })
    const source = path.join(process.cwd(), 'output.json')
    const destination = path.join(pathSD, 'output.json')
    console.log('source', source)
    console.log('destination', destination)
    fs.rename(source, destination, function (err) {
      if (err) {
        console.log(err)
      }
      console.log('JSON moved successfully')
    })
  }, [])
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my starknode</H1>
          <TextGray>
            4. Give your Starknode a moment to setup
          </TextGray>
        </Row>
        <Button onClick={() => nextStep(5)}>Loading</Button>
        <Inputs>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default Step4