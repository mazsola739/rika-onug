import styled from "styled-components"

const primaryColor = '#00FFFF'
const secondaryColor = '#00BFFF'
const buttonTextColor = 'black'

export const StyledStub = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  font-family: 'Josefin Sans', sans-serif;
  height: 92%;
  width: 100%;
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  width: 60%;
`

export const RightSide = styled.div`
  height: 100%;
  padding: 20px;
  width: 40%;
`

export const PositionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 3px;
  justify-content: flex-end;
`

export const PopulatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  width: 100%;
`

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ResponseContainer = styled.div`
  border: 1px solid white;
  border-radius: 5px;
  height: 85%;
  overflow-y: auto;
  padding: 20px;
`

export const StubTitle = styled.h4`
  color: white;
  margin-bottom: 10px;
  margin: 5px;
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  color: white;
`

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-end;

  gap: 10px;
  justify-content: flex-end;
`
export const InputField = styled.input`
  border: 1px solid white;
  border-radius: 5px;
  height: 15px;
  width: 55px;
`

export const RoleName = styled.span`
  color: white;
  min-width: 300px;
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Button = styled.button`
  align-items: center;
  background-color: ${primaryColor};
  border: none;
  border-radius: 5px;
  color: ${buttonTextColor};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 15px;
  padding: 2px;
  text-align: center;
  width: 100px;
  height: 25px;
  justify-content: center;

  &:hover {
    background-color: ${secondaryColor};
  }
`

export const ResponsePre = styled.pre`
  color: white;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 12px;
  margin: 0;
  text-align: left;
  white-space: pre-wrap;
`
