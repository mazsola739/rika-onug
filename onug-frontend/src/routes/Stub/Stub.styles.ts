import styled from '@emotion/styled'

const primaryColor = '#00AACC'
const secondaryColor = '#0088AA'
const textColor = 'white'
const backgroundColor = '#20232a'
const inputBorderColor = '#ddd'

export const StubContainer = styled.div`
  display: flex;
  padding: 1.25rem;
  gap: 1.25rem;
  height: 100%;
  width: 100%;
  font-family: 'Roboto', sans-serif;
  background-color: ${backgroundColor};
`

export const Container = styled.div`
  flex: 1;
  border-radius: 0.75rem;
  padding: 1.25rem;
  background-color: #282c34;
  box-shadow: 0 0.25rem 0.5rem rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`

export const StubTitle = styled.h3`
  color: ${textColor};
  margin-bottom: 1.25rem;
  font-size: 1.4rem;
`

export const FormContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.625rem 1.25rem;
`

export const InputsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`

export const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.3125rem;
`

export const Grid = styled.div`
  display: flex;
  align-items: center;
  gap: 0.3125rem;
  justify-content: flex-start;
`

export const Label = styled.label`
  color: ${textColor};
  font-size: 0.9rem;
  min-width: 90px;
`

export const InputField = styled.input`
  width: 50px;
  padding: 0.3125rem;
  border: 0.0625rem solid ${inputBorderColor};
  border-radius: 0.3125rem;
  background-color: #fff;
  font-size: 1rem;
`

export const Button = styled.button`
  padding: 0.5rem;
  font-size: 0.75rem;
  font-weight: bold;
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

export const RoleDisplay = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.1875rem;
  font-size: 0.875rem;
  color: ${textColor};
  padding: 0.625rem;
  border: 0.0625rem solid ${inputBorderColor};
  border-radius: 0.1875rem;
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
