import styled from '@emotion/styled'

const primaryColor = '#00AACC'
const secondaryColor = '#0088AA'
const textColor = 'white'
const buttonTextColor = 'white'
const backgroundColor = '#20232a'

export const StyledGod = styled.div`
  display: flex;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  padding: 10px;
  gap: 10px;
  background-color: ${backgroundColor};
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 10px;
  width: 40%;
  background-color: #282c34;
  border-radius: 5px;
  box-shadow: 0 0.25rem 8px rgba(0, 0, 0, 0.1);
`

export const RightSide = styled.div`
  padding: 10px;
  width: 60%;
  background-color: #282c34;
  border-radius: 5px;
  box-shadow: 0 0.25rem 8px rgba(0, 0, 0, 0.1);
`

export const GamestatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const WSContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const ResponseContainer = styled.div`
  border: 0.0625rem solid #ddd;
  border-radius: 5px;
  padding: 10px;
  height: 95%;
  overflow-y: auto;
  background-color: #333;
`

export const GodTitle = styled.h4`
  color: ${textColor};
  text-align: center;
`

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 10px;
  width: 100%;
`

export const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

export const Label = styled.label`
  color: ${textColor};
  font-size: 0.9rem;
`

export const Input = styled.input`
  padding: 8px;
  border: 0.0625rem solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  background-color: #fff;
  color: #333;
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`

export const Button = styled.button`
  padding: 10px;
  font-size: 0.7rem;
  color: ${textColor};
  background-color: ${primaryColor};
  border-radius: 5px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: ${secondaryColor};
  }

  &:disabled {
    background-color: transparent;
    color: #aaa;
  }
`

export const ResponsePre = styled.pre`
  color: ${textColor};
  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  white-space: pre-wrap;
`
