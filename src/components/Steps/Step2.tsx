import React from 'react'
import { Button, ButtonSmall, OutlineButton } from '../s-components/Buttons'
import { Card } from '../s-components/Card'
import { H1, TextGray } from '../s-components/Texts'
import Logo from '../../assets/kasar.jpg'
import styled from 'styled-components'
import ArrowGray from '../../assets/icons/ArrowGray.png'

const Image = styled.img`
  width: 61px;
  height: 61px;  
`

const Rows = styled.div`
  display: flex;
  flex-direction: column;
  gap: 35px;
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

function Step2() {
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
          <OutlineButton>
            Setup my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
          <OutlineButton>
            Update my Starknode
            <img src={ArrowGray} />
          </OutlineButton>
          <ButtonSmall>Prev</ButtonSmall>
        </Buttons>
      </Rows>
    </Card>
  )
}

export default Step2