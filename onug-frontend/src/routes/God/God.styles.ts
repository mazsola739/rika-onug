import styled from '@emotion/styled'

const primaryColor = '#00AACC'
const secondaryColor = '#0088AA'
const textColor = 'white'
const buttonTextColor = 'white'
const backgroundColor = '#20232a'

export const StyledGod = styled.div`
  display: flex;
  flex-direction: row;
  font-family: 'Roboto', sans-serif;
  height: 100%;
  width: 100%;
  padding: 1.25rem;
  gap: 1.25rem;
  background-color: ${backgroundColor};
`

export const LeftSide = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
  padding: 1.25rem;
  width: 40%;
  background-color: #282c34;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`

export const RightSide = styled.div`
  padding: 1.25rem;
  width: 60%;
  background-color: #282c34;
  border-radius: 0.75rem;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
`

export const GamestatesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const WSContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const MetaContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const ResponseContainer = styled.div`
  border: 0.0625rem solid #ddd;
  border-radius: 0.75rem;
  padding: 1.25rem;
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
  gap: 0.625rem 1.25rem;
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
  padding: 0.5rem;
  border: 0.0625rem solid #ddd;
  border-radius: 0.3125rem;
  font-size: 1rem;
  background-color: #fff;
`

export const ButtonsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.625rem;
`

export const Button = styled.button`
  padding: 0.625rem;
  font-size: 0.7rem;
  color: ${textColor};
  background-color: ${primaryColor};
  border-radius: 0.3125rem;
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
