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

interface ButtonPrimeProps {
  disabled?: boolean;
}


export const OutlineButton = styled.button<ButtonPrimeProps>`
  width: 100%;
  height: 73px;
  left: 49px;
  background: ${({ disabled }) => (disabled ? '#D3D3D3' : 'linear-gradient(0deg, #FFFFFF, #FFFFFF)')};
  border-radius: 5px;
  border: 1px solid #EAEAEA;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: #191919;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 21px 25px;
  font-size: 20px;
  transition: 0.3s;
  &:hover {
    ${({ disabled }) =>
    !disabled &&
    `
        color: white;
        background: #2962D2;
      `
  }
  }
`

export const ButtonSmall = styled.button<ButtonPrimeProps>`
  height: 54px;
  width: 125px;
  background: ${({ disabled }) => (disabled ? '#D3D3D3' : '#2962D2')};
  border-radius: 5px;
  border: none;
  box-shadow: 0px 2px 7px rgba(0, 0, 0, 0.25);
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 22px;
  font-size: 20px;
  transition: 0.3s;
  &:hover {
    ${({ disabled }) =>
    !disabled &&
    `
        color: #191919;
        background: linear-gradient(0deg, #FFFFFF, #FFFFFF);
      `
  }
  }
`