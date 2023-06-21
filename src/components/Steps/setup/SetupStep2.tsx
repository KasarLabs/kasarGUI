import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'
import SetupGif from '../../../assets/gif/laptop.gif'
import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'

const Image = styled.img`
  width: 70%;
  border-radius: 5px;

`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  gap: 10px;
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
  width: 100%;
`

const FlexRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

type StepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
  setPathSD: (arg: string) => void;
  pathSD: string;
}



function Step2({ nextStep, previousStep, setPathSD, pathSD }: StepProps) {

  const handleClick = () => {
    ipcRenderer.send('open-directory-dialog')
  }

  ipcRenderer.on('selected-directory', (event, path) => {
    setPathSD(path + '/src/')
  })

  // useEffect(() => {
  //   if (pathSD) nextStep(3)
  // }, [pathSD])

  const confirmClick = () => {
    nextStep(3)
  }

  function isDisabledButton(pathSD: string) {
    if (!pathSD)
      return true
    return false;
  }
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my <Gradient>Starknode</Gradient></H1>
          <TextGray>
            1. Please connect your Micro SD card to your computer using the USB to microSD flasher
          </TextGray>
        </Row>
        <Image src={SetupGif} alt='setup starknode' />
        <TextGray>
          Selected path: {pathSD}
        </TextGray>
        <Buttons>
          <OutlineButton onClick={handleClick}>
            Select your micro SD storage
            <img src={ArrowGray} />
          </OutlineButton>
          {/* <ButtonSmall onClick={previousStep}>Prev</ButtonSmall> */}
        </Buttons>
        <FlexRow>
          <ButtonSmall type='button' onClick={() => nextStep(8)}>Prev</ButtonSmall>
          <ButtonSmall disabled={isDisabledButton(pathSD)} type='button' form='auth' value='Submit' onClick={confirmClick}>
            Next
          </ButtonSmall>
        </FlexRow>
      </Rows>
    </Card>
  )
}

export default Step2