import styled from '@emotion/styled'

const primaryColor = '#00FFFF'
const secondaryColor = '#00BFFF'
const textColor = '#222'

export const StyledGod = styled.div`
  display: flex;
  flex-direction: row;
  height: 90%;
  width: 100%;
  font-family: 'Josefin Sans', sans-serif;
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  height: 100%;
  width: 30%;
`

export const RightSide = styled.div`
  padding: 20px;
  height: 100%;
  width: 70%;
`

export const GameStatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const WSContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`

export const ResponseContainer = styled.div`
  overflow-y: auto;
  height: 85%;
  border: 1px solid ${textColor};
  border-radius: 5px;
  padding: 20px;
`

export const GodTitle = styled.h2`
  margin-bottom: 10px;
  color: ${textColor};
`

export const FormContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: 10px;
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
`

export const ButtonsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const Button = styled.button`
  width: 100%;
  background-color: ${primaryColor};
  color: ${textColor};
  font-family: 'Josefin Sans', sans-serif;
  padding: 5px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: ${secondaryColor};
  }
`

export const ResponsePre = styled.pre`
  text-align: left;
  margin: 0;
  white-space: pre-wrap;
  font-family: 'Josefin Sans', sans-serif;
  font-size: 12px;
  color: ${textColor};
`
