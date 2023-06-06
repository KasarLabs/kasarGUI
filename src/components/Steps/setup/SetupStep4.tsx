import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { Gradient, H1, Text, TextGray } from '../../s-components/Texts'
import styled from 'styled-components'
import { IJson } from '@/App'
import fs from 'fs'
import path from 'path'
import { useEffect, useState } from 'react'
import { LineProgressBar } from '@frogress/line'
import { SERVER_NODE_API } from '@/constants'
import axios from 'axios'

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
  setPathSD: (arg: string) => void;
}

function Step4({ nextStep, previousStep, jsonData, pathSD, setPathSD }: PreviousStepProps) {
  const [progress, setProgress] = useState(0)



  useEffect(() => {
    if (progress < 100) {
      const timer = setInterval(() => {
        setProgress(progress => progress + 1)
      }, 50)
      return () => clearInterval(timer)
    }
    if (progress === 100) {
      nextStep(5)
    }
  }, [progress])

  useEffect(() => {
    const source = path.join(process.cwd(), 'config.json');
    const destination = path.join(pathSD, 'config.json');
    fs.writeFile(source, JSON.stringify(jsonData), 'utf8', function (err) {
      if (err) {
        console.log('error', err);
        return;  // return early if write failed       
      }
      // Only try to move if write was successful       
      fs.copyFile(source, destination, function (err) {
        if (err) { console.log(err); } else {
          console.log('JSON copied successfully');
          // Delete original file if needed           
          fs.unlink(source, function (err) {
            if (err) {
              console.log(err);
            } else {
              console.log('Original JSON deleted successfully');
            }
          });
        }
      });
      setPathSD('')
    });
  }, []);
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Setup my <Gradient>Starknode</Gradient></H1>
          <TextGray>
            4. Give your Starknode a moment to setup
          </TextGray>
        </Row>
        <LineProgressBar percent={progress} height={30} rounded={5} progressColor='#2962D2)' />
        <Inputs>
          <ButtonSmall onClick={previousStep}>Prev</ButtonSmall>
        </Inputs>
      </Rows>
    </Card>
  )
}

export default Step4