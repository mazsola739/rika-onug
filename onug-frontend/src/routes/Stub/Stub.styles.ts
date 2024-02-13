import styled from '@emotion/styled'

const primaryColor = '#00FFFF'
const secondaryColor = '#00BFFF'
const textColor = 'white'
const buttonTextColor = 'black'

export const StyledStub = styled.div`
  margin: auto;
  display: flex;
  flex-direction: row;
  font-family: 'Josefin Sans', sans-serif;
  height: 90%;
  width: 100%;
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 20px;
  width: 40%;
`

export const RightSide = styled.div`
  height: 100%;
  padding: 20px;
  width: 60%;
`

export const PositionContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  padding: 3px;
  justify-content: flex-start;
  align-items: flex-start;
`

export const PopulatorContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
`

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ResponseContainer = styled.div`
  border: 1px solid ${textColor};
  border-radius: 5px;
  height: 85%;
  overflow-y: auto;
  padding: 20px;
`

export const StubTitle = styled.h4`
  color: ${textColor};
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
  width: 50%;
`

export const Label = styled.label`
  color: ${textColor};
`

export const Input = styled.input`
  border: 1px solid ${textColor};
  border-radius: 5px;
  height: 15px;
  width: 55px;
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
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
  width: 100%;

  &:hover {
    background-color: ${secondaryColor};
  }
`

export const ResponsePre = styled.pre`
  color: ${textColor};
  font-family: 'Josefin Sans', sans-serif;
  font-size: 12px;
  margin: 0;
  text-align: left;
  white-space: pre-wrap;
`
