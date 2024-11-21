import styled from '@emotion/styled'

const primaryColor = '#00AACC'
const secondaryColor = '#0088AA'
const textColor = 'white'
const backgroundColor = '#20232a'
const inputBorderColor = '#ddd'

export const StubContainer = styled.div`
  display: flex;
  padding: 10px;
  gap: 10px;
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  background-color: ${backgroundColor};
`

export const Container = styled.div`
  flex: 1;
  border-radius: 0.75rem;
  padding: 10px;
  background-color: #282c34;
  box-shadow: 0 0.25rem 8px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 10px;
`

export const StubTitle = styled.h3`
  color: ${textColor};
  margin-bottom: 10px;
  font-size: 1.4rem;
`

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 10px;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`

export const Grid = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  justify-content: flex-start;
`

export const Label = styled.label`
  color: ${textColor};
  font-size: 0.9rem;
  min-width: 90px;
`

export const InputField = styled.input`
  width: 50px;
  padding: 0.375rem;
  border: 0.0625rem solid ${inputBorderColor};
  border-radius: 5px;
  background-color: #fff;
  color: black;
  font-size: 1rem;
`

export const Button = styled.button`
  padding: 8px;
  font-size: 0.75rem;
  font-weight: bold;
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

export const RoleDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 3px;
  font-size: 0.875rem;
  color: ${textColor};
  padding: 10px;
  border: 0.0625rem solid ${inputBorderColor};
  border-radius: 3px;
  overflow-y: auto;
  max-height: 300px;
  background-color: #282c34;
`

export const PreDisplay = styled.div`
  display: flex;
  max-height: 200px;
  overflow-y: auto;
  color: ${textColor};
  border: 0.0625rem solid ${inputBorderColor};
  background-color: #282c34;
`
