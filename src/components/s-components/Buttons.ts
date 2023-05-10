import styled from 'styled-components'


export const Button = styled.button`
  width: 100%;
  height: 73px;
  left: 49px;
  background: #2962D2;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 25px;
  font-size: 20px;
  transition: 0.3s;
  &:hover {
    color: #191919;
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  }
`


export const OutlineButton = styled.button`
  width: 100%;
  height: 73px;
  left: 49px;
  background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: #191919;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 25px;
  font-size: 20px;
  transition: 0.3s;
  &:hover {
    color: white;
    background: #2962D2;
  }
`

export const ButtonSmall = styled.button`
  height: 42px;
  left: 49px;
  background: #2962D2;
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: pointer;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 22px;
  font-size: 20px;
  transition: 0.3s;
  &:hover {
    color: #191919;
    background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
  }
`