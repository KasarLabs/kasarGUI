import React from 'react'
import { Button, ButtonSmall, OutlineButton } from '../../s-components/Buttons'
import { Card } from '../../s-components/Card'
import { H1, TextGray } from '../../s-components/Texts'
import Logo from '../../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../../assets/icons/ArrowGray.png'

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
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
  width: 100%;
`

type StepProps = {
  nextStep: (num: number) => void;
  previousStep: () => void;
}

function UpdateStep1({ nextStep, previousStep }: StepProps) {
  return (
    <Card>
      <Rows>
        <Row>
          <H1>Update my Starknode</H1>
          <TextGray>
            Would you like to update your Starknode or setup another client (this second option will reset all previously synced data)
          </TextGray>
        </Row>

        <Buttons>
          <OutlineButton onClick={() => nextStep(1)}>
            Setup my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
          <OutlineButton onClick={() => nextStep(12)}>
            Update my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
        </Buttons>
        <ButtonSmall>Prev</ButtonSmall>
      </Rows>
    </Card>
  )
}

export default UpdateStep1